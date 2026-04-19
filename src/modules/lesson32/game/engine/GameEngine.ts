/**
 * Simple Canvas-based Game Engine
 * Handles game loop, rendering, and input
 *
 * Viewport: 800x600 (what the player sees)
 * World: full map size (e.g. 3457x6833)
 * Camera: follows food centered, clamps at world edges
 */

import {
  CollisionSystem,
  Obstacle,
  Zone,
  Waypoint,
  ZonePathMapping,
  DEFAULT_OBSTACLES,
  DEFAULT_ZONES,
  DEFAULT_ZONE_PATH_MAPPINGS,
} from "./CollisionSystem";
import { CollisionRectEditor } from "./CollisionRectEditor";
import hamburgerSprite from "../../../../assets/img/hamburger.png";
import inMounthSprite from "../../../../assets/img/In_mounth.png";
import pipeDegistiveSprite from "../../../../assets/img/Pipe degistive.png";

// ===== VIEWPORT CONSTANTS =====
export const VIEWPORT_WIDTH = 800;
export const VIEWPORT_HEIGHT = 600;
// ===============================

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  update?(deltaTime: number): void;
  draw?(ctx: CanvasRenderingContext2D): void;
}

// ─── Food Class ───────────────────────────────────────────

export class Food implements GameObject {
  x: number;
  y: number;
  width = 20;
  height = 20;
  speed = 300; // pixels per second
  private readonly spriteWidth = 200;
  private readonly spriteHeight = 200;
  private readonly pipeScaleDivisor = 2.5;

  // Visual state machine
  private visualMode: "hamburger" | "in_mounth" | "pipe" | "circle" =
    "hamburger";

  // Sprite cache
  private spriteImages: Record<
    "hamburger" | "in_mounth" | "pipe",
    HTMLImageElement | null
  > = {
    hamburger: null,
    in_mounth: null,
    pipe: null,
  };
  private spriteLoaded: Record<"hamburger" | "in_mounth" | "pipe", boolean> = {
    hamburger: false,
    in_mounth: false,
    pipe: false,
  };

  // ── Manual movement state ──
  targetX: number | null = null;
  targetY: number | null = null;
  isMoving = false;

  // ── Automated movement state ──
  /** True when food is following a predefined waypoint path */
  isAutoMoving = false;
  /** The waypoint path currently being followed */
  private autoPath: Waypoint[] = [];
  /** Index of the NEXT waypoint to move toward */
  private autoPathIndex = 0;
  /** The zone IDs that triggered this auto path (for locking afterward) */
  private autoTriggerZoneIds: string[] = [];

  /** Reference to collision system for movement resolution */
  private collisionSystem: CollisionSystem | null = null;

  /** Number of consecutive frames the food has been blocked */
  private blockedFrames = 0;
  private readonly MAX_BLOCKED_FRAMES = 10;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.loadSprites();
  }

  private loadImage(key: "hamburger" | "in_mounth" | "pipe", src: string) {
    const img = new Image();
    this.spriteImages[key] = img;

    img.onload = () => {
      this.spriteLoaded[key] = true;
    };
    img.onerror = () => {
      this.spriteLoaded[key] = false;
      console.error("Failed to load food sprite", src);
    };
    img.src = src;
  }

  private loadSprites() {
    this.loadImage("hamburger", hamburgerSprite);
    this.loadImage("in_mounth", inMounthSprite);
    this.loadImage("pipe", pipeDegistiveSprite);
  }

  /**
   * Set collision system reference
   */
  setCollisionSystem(cs: CollisionSystem) {
    this.collisionSystem = cs;
  }

  // ── Manual Movement ─────────────────────────────────────

  /**
   * Move to target position (manual click movement).
   * Ignored if currently in auto-movement.
   */
  moveTo(targetX: number, targetY: number) {
    if (this.isAutoMoving) return; // block manual input during auto

    this.targetX = targetX;
    this.targetY = targetY;
    this.isMoving = true;
    this.blockedFrames = 0;
  }

  /**
   * Stop manual movement
   */
  stop() {
    this.targetX = null;
    this.targetY = null;
    this.isMoving = false;
    this.blockedFrames = 0;
  }

  // ── Automated Pathfinding ───────────────────────────────

  /**
   * Start automated movement along a waypoint path.
   *
   * 1. Finds the closest waypoint in `path` to the food's current position.
   * 2. Snaps the food to that closest point.
   * 3. Begins auto-moving through the remaining waypoints.
   *
   * @param path        Array of waypoints to follow.
   * @param zoneIds     The zone IDs that triggered this path (for locking on completion).
   */
  startAutoPath(path: Waypoint[], zoneIds: string[]) {
    if (path.length === 0) return;

    // Stop any current manual movement
    this.stop();

    // Find closest waypoint to current position
    let closestIndex = 0;
    let closestDist = Infinity;
    for (let i = 0; i < path.length; i++) {
      const dx = path[i].x - this.x;
      const dy = path[i].y - this.y;
      const dist = dx * dx + dy * dy;
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    }

    // Snap to the closest waypoint
    this.x = path[closestIndex].x;
    this.y = path[closestIndex].y;

    // Store path state
    this.autoPath = path;
    this.autoPathIndex = closestIndex + 1; // next waypoint after snap
    this.autoTriggerZoneIds = [...zoneIds];
    this.isAutoMoving = true;

    // Requested flow: zone_1 auto starts with in_mounth image.
    if (zoneIds.includes("zone_1") && this.visualMode !== "circle") {
      this.visualMode = "in_mounth";
    }

    console.log(
      `🚀 Auto-path started: ${zoneIds.join(", ")} → ${path.length} waypoints ` +
        `(snapped to #${closestIndex}, moving to #${this.autoPathIndex})`,
    );
  }

  /**
   * Complete the auto-path:
   *  - Return to manual control
   *  - Re-enable collisions (ghost mode off)
   *  - Lock the triggering zone(s) as walls
   */
  private completeAutoPath() {
    const endedZone1Auto = this.autoTriggerZoneIds.includes("zone_1");

    console.log(
      `✅ Auto-path completed for zones: ${this.autoTriggerZoneIds.join(", ")}`,
    );

    // Mark the triggering zones as passed → they become walls
    if (this.collisionSystem) {
      for (const zoneId of this.autoTriggerZoneIds) {
        this.collisionSystem.markZoneAsPassed(zoneId);
      }
    }

    // Reset auto state
    this.autoPath = [];
    this.autoPathIndex = 0;
    this.autoTriggerZoneIds = [];
    this.isAutoMoving = false;

    // Requested flow: after zone_1 auto ends, switch to pipe image until zone_2.
    if (endedZone1Auto && this.visualMode !== "circle") {
      this.visualMode = "pipe";
    }
  }

  // ── Update ──────────────────────────────────────────────

  update(deltaTime: number) {
    this.syncVisualStateByZones();

    if (this.isAutoMoving) {
      this.updateAutoMovement(deltaTime);
    } else {
      this.updateManualMovement(deltaTime);
    }
  }

  /**
   * Keep visual mode synced even if a zone enter event is skipped.
   */
  private syncVisualStateByZones() {
    if (!this.collisionSystem || this.visualMode === "circle") return;

    // Requested flow: once zone_2 is reached, revert to default circle forever.
    if (
      this.collisionSystem.hasEnteredZone("zone_2") ||
      this.collisionSystem.isInsideZone("zone_2", this.x, this.y, this.width)
    ) {
      this.visualMode = "circle";
    }
  }

  /**
   * Update for auto-movement (ghost mode — ignores walls)
   */
  private updateAutoMovement(deltaTime: number) {
    // If we've exhausted all waypoints, complete the path
    if (this.autoPathIndex >= this.autoPath.length) {
      this.completeAutoPath();
      return;
    }

    const target = this.autoPath[this.autoPathIndex];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Reached current waypoint? Advance to the next one.
    if (distance < 5) {
      this.x = target.x;
      this.y = target.y;
      this.autoPathIndex++;

      // Update zone tracking even during auto movement
      if (this.collisionSystem) {
        this.collisionSystem.updateZoneTracking(this.x, this.y, this.width);
        this.syncVisualStateByZones();
      }
      return;
    }

    // Interpolate toward the target waypoint
    const moveDistance = this.speed * deltaTime;
    const ratio = Math.min(moveDistance / distance, 1);

    // GHOST MODE: move directly, NO wall collision resolution
    this.x += dx * ratio;
    this.y += dy * ratio;

    // Still track zones during auto movement
    if (this.collisionSystem) {
      this.collisionSystem.updateZoneTracking(this.x, this.y, this.width);
      this.syncVisualStateByZones();
    }
  }

  /**
   * Update for manual movement (with wall collisions)
   */
  private updateManualMovement(deltaTime: number) {
    if (!this.isMoving || this.targetX === null || this.targetY === null) {
      return;
    }

    // Calculate distance to target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If reached target, stop
    if (distance < 5) {
      // Final position check
      const finalPos = this.resolvePosition(this.targetX, this.targetY);
      this.x = finalPos.x;
      this.y = finalPos.y;
      this.stop();

      // Check zone triggers after reaching destination
      this.checkZoneTrigger();
      return;
    }

    // Move towards target step by step
    const moveDistance = this.speed * deltaTime;
    const ratio = Math.min(moveDistance / distance, 1);

    const newX = this.x + dx * ratio;
    const newY = this.y + dy * ratio;

    // Resolve movement through collision system
    const resolved = this.resolvePosition(newX, newY);

    if (resolved.blocked) {
      this.blockedFrames++;
      // If stuck for too many frames, stop trying
      if (this.blockedFrames >= this.MAX_BLOCKED_FRAMES) {
        this.stop();
        return;
      }
    } else {
      this.blockedFrames = 0;
    }

    this.x = resolved.x;
    this.y = resolved.y;

    // Update zone tracking & check for auto-path triggers
    this.checkZoneTrigger();
  }

  /**
   * Check if food has entered a zone that triggers an auto-path.
   */
  private checkZoneTrigger() {
    if (!this.collisionSystem) return;

    const enteredZone = this.collisionSystem.updateZoneTracking(
      this.x,
      this.y,
      this.width,
    );
    this.syncVisualStateByZones();

    if (enteredZone) {
      if (enteredZone.id === "zone_2") {
        this.visualMode = "circle";
      }

      // Look up if this zone has an associated path
      const mapping = this.collisionSystem.getPathForZone(enteredZone.id);
      if (mapping) {
        this.startAutoPath(mapping.path, mapping.zoneIds);
      }
    }
  }

  /**
   * Resolve position through collision system (manual mode only)
   */
  private resolvePosition(
    newX: number,
    newY: number,
  ): { x: number; y: number; blocked: boolean } {
    if (!this.collisionSystem) {
      return { x: newX, y: newY, blocked: false };
    }

    return this.collisionSystem.resolveMovement(
      this.x,
      this.y,
      newX,
      newY,
      this.width,
    );
  }

  // ── Drawing ─────────────────────────────────────────────

  draw(ctx: CanvasRenderingContext2D) {
    // Ghost mode visual: draw a pulsing glow when auto-moving
    if (this.isAutoMoving) {
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 150);
      const glowRadius = this.width + 8 + pulse * 4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 200, 255, ${0.15 + pulse * 0.1})`;
      ctx.fill();

      // Draw direction line to next waypoint
      if (this.autoPathIndex < this.autoPath.length) {
        const next = this.autoPath[this.autoPathIndex];
        ctx.strokeStyle = "rgba(0, 200, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    const spriteKey =
      this.visualMode === "hamburger"
        ? "hamburger"
        : this.visualMode === "in_mounth"
          ? "in_mounth"
          : this.visualMode === "pipe"
            ? "pipe"
            : null;

    const sprite = spriteKey ? this.spriteImages[spriteKey] : null;
    const shouldDrawSprite =
      spriteKey !== null && sprite !== null && this.spriteLoaded[spriteKey];

    if (shouldDrawSprite) {
      const isPipeSprite = spriteKey === "pipe";
      const drawWidth = isPipeSprite
        ? this.spriteWidth / this.pipeScaleDivisor
        : this.spriteWidth;
      const drawHeight = isPipeSprite
        ? this.spriteHeight / this.pipeScaleDivisor
        : this.spriteHeight;
      const drawX = this.x - drawWidth / 2;
      const drawY = this.y - drawHeight / 2;
      ctx.drawImage(sprite, drawX, drawY, drawWidth, drawHeight);
    } else {
      // Main food circle
      ctx.fillStyle = this.isAutoMoving ? "#00C8FF" : "#FF6B35";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = this.isAutoMoving ? "#0096D6" : "#FF4500";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Auto-move indicator text
    if (this.isAutoMoving) {
      ctx.fillStyle = "rgba(0, 200, 255, 0.9)";
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.fillText("AUTO", this.x, this.y - this.width - 6);
      ctx.textAlign = "start";
    }
  }
}

// ─── GameEngine Class ─────────────────────────────────────

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  // Viewport (what the player sees on screen)
  private viewportWidth: number;
  private viewportHeight: number;

  // Game world (full map)
  private worldWidth: number;
  private worldHeight: number;

  // Background image
  private backgroundImage: HTMLImageElement | null = null;
  private backgroundUrl: string;

  // Collision system
  private collisionSystem: CollisionSystem;

  // Collision rect editor (for creating obstacles visually)
  private collisionEditor: CollisionRectEditor;

  // Camera position (top-left corner of the viewport in world coordinates)
  private cameraX = 0;
  private cameraY = 0;

  private gameObjects: GameObject[] = [];
  private lastTime: number = Date.now();
  private isRunning = false;
  private backgroundColor = "#E8F4F8";

  constructor(
    canvas: HTMLCanvasElement,
    worldWidth = 3457,
    worldHeight = 6833,
    backgroundUrl = "",
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");

    this.ctx = ctx;

    // Set canvas to viewport size
    this.viewportWidth = VIEWPORT_WIDTH;
    this.viewportHeight = VIEWPORT_HEIGHT;
    canvas.width = VIEWPORT_WIDTH;
    canvas.height = VIEWPORT_HEIGHT;

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.backgroundUrl = backgroundUrl;

    // Initialize collision system
    this.collisionSystem = new CollisionSystem(true); // Set true to show collision rects
    this.collisionSystem.addObstacles(DEFAULT_OBSTACLES);
    // Clone zones to avoid stale triggered state between reloads/runs.
    this.collisionSystem.setZones(
      DEFAULT_ZONES.map((zone) => ({ ...zone, triggered: false })),
    );
    this.collisionSystem.addZonePathMappings(DEFAULT_ZONE_PATH_MAPPINGS);

    // Initialize collision rect editor
    this.collisionEditor = new CollisionRectEditor(canvas, this.ctx);

    this.loadBackground();
    this.setupInput();
  }

  /**
   * Load background image
   */
  private loadBackground() {
    if (!this.backgroundUrl) return;

    this.backgroundImage = new Image();
    this.backgroundImage.onload = () => {
      console.log(
        `Background loaded: ${this.backgroundImage?.width}x${this.backgroundImage?.height}`,
      );
    };
    this.backgroundImage.onerror = () => {
      console.error(`Failed to load background: ${this.backgroundUrl}`);
    };
    this.backgroundImage.src = this.backgroundUrl;
  }

  /**
   * Setup mouse input - converts screen coordinates to world coordinates
   */
  private setupInput() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();

      // Get click position relative to canvas element
      const scaleX = this.viewportWidth / rect.width;
      const scaleY = this.viewportHeight / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Convert viewport coords to world coords
      const worldX = clickX + this.cameraX;
      const worldY = clickY + this.cameraY;

      // Clamp to world bounds
      const clampedX = Math.max(0, Math.min(worldX, this.worldWidth));
      const clampedY = Math.max(0, Math.min(worldY, this.worldHeight));

      const food = this.getFood();
      if (food) {
        // moveTo is a no-op when isAutoMoving is true
        food.moveTo(clampedX, clampedY);
      }
    });
  }

  /**
   * Add object to game
   */
  addObject(obj: GameObject) {
    this.gameObjects.push(obj);
  }

  /**
   * Get collision system
   */
  getCollisionSystem(): CollisionSystem {
    return this.collisionSystem;
  }

  /**
   * Enable/Disable collision rect editor
   */
  setCollisionEditorEnabled(enabled: boolean) {
    this.collisionEditor.setEnabled(enabled);
  }

  /**
   * Get collision editor for direct access
   */
  getCollisionEditor(): CollisionRectEditor {
    return this.collisionEditor;
  }

  /**
   * Get food object
   */
  getFood(): Food | undefined {
    return this.gameObjects[0] as Food | undefined;
  }

  /**
   * Draw background - only renders the portion visible in the viewport
   */
  private drawBackground() {
    // Fill viewport with background color first
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);

    // Draw only the visible portion of the background image
    if (this.backgroundImage && this.backgroundImage.complete) {
      // Source rectangle: the portion of the image we want to draw
      const sx = this.cameraX;
      const sy = this.cameraY;
      const sw = Math.min(this.viewportWidth, this.worldWidth - this.cameraX);
      const sh = Math.min(this.viewportHeight, this.worldHeight - this.cameraY);

      // Destination rectangle: where on the canvas to draw it
      const dx = 0;
      const dy = 0;
      const dw = sw;
      const dh = sh;

      if (sw > 0 && sh > 0) {
        this.ctx.drawImage(
          this.backgroundImage,
          sx,
          sy,
          sw,
          sh,
          dx,
          dy,
          dw,
          dh,
        );
      }
    }

    // Draw grid for reference (only visible portion)
    this.ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    this.ctx.lineWidth = 1;

    const gridSize = 50;

    // Calculate grid lines relative to camera
    const gridStartX = -(this.cameraX % gridSize);
    const gridStartY = -(this.cameraY % gridSize);

    // Vertical lines
    for (let x = gridStartX; x <= this.viewportWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.viewportHeight);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = gridStartY; y <= this.viewportHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.viewportWidth, y);
      this.ctx.stroke();
    }
  }

  /**
   * Update camera to follow food.
   *
   * The camera tries to keep food centered in the viewport.
   * When food is near a world edge, the camera clamps so it doesn't
   * show anything outside the world. In that case, food is no longer
   * centered and moves freely within the viewport.
   */
  private updateCamera() {
    const food = this.getFood();
    if (!food) return;

    // Desired camera position to center food
    let targetCamX = food.x - this.viewportWidth / 2;
    let targetCamY = food.y - this.viewportHeight / 2;

    // Clamp camera to world bounds so we never show outside the world
    // When clamped, food will appear off-center (free movement in viewport)
    const maxCamX = Math.max(0, this.worldWidth - this.viewportWidth);
    const maxCamY = Math.max(0, this.worldHeight - this.viewportHeight);

    this.cameraX = Math.max(0, Math.min(targetCamX, maxCamX));
    this.cameraY = Math.max(0, Math.min(targetCamY, maxCamY));

    // Update editor camera position
    this.collisionEditor.setCameraPosition(this.cameraX, this.cameraY);
  }

  /**
   * Update game state
   */
  private update(deltaTime: number) {
    // Update all objects (Food handles its own collision resolution internally)
    for (const obj of this.gameObjects) {
      if (obj.update) {
        obj.update(deltaTime);
      }
    }

    // Clamp food to world bounds
    const food = this.getFood();
    if (food) {
      food.x = Math.max(
        food.width,
        Math.min(food.x, this.worldWidth - food.width),
      );
      food.y = Math.max(
        food.height,
        Math.min(food.y, this.worldHeight - food.height),
      );
    }

    // Update camera
    this.updateCamera();
  }

  /**
   * Render game - only draws what's visible in the viewport
   */
  private render() {
    // Clear the entire viewport
    this.ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);

    // Draw background (already handles viewport clipping)
    this.drawBackground();

    // Save context state for world-space rendering
    this.ctx.save();

    // Translate so world objects are drawn relative to the camera
    this.ctx.translate(-this.cameraX, -this.cameraY);

    // Set clipping region to viewport (in world coordinates)
    this.ctx.beginPath();
    this.ctx.rect(
      this.cameraX,
      this.cameraY,
      this.viewportWidth,
      this.viewportHeight,
    );
    this.ctx.clip();

    // Draw all game objects (only those within or near viewport will be visible)
    for (const obj of this.gameObjects) {
      if (obj.draw) {
        // Simple visibility check - skip objects far outside viewport
        if (this.isInViewport(obj)) {
          obj.draw(this.ctx);
        }
      }
    }

    // Draw collision rects (debug)
    this.collisionSystem.draw(this.ctx);

    // Draw collision editor rects
    this.collisionEditor.draw();

    // Restore context state
    this.ctx.restore();

    // Draw UI on screen (not affected by camera)
    this.drawUI();
  }

  /**
   * Check if a game object is within or near the viewport
   */
  private isInViewport(obj: GameObject): boolean {
    const margin = 50; // Extra margin to avoid popping
    return (
      obj.x + obj.width >= this.cameraX - margin &&
      obj.x - obj.width <= this.cameraX + this.viewportWidth + margin &&
      obj.y + obj.height >= this.cameraY - margin &&
      obj.y - obj.height <= this.cameraY + this.viewportHeight + margin
    );
  }

  /**
   * Draw screen-space UI elements
   */
  private drawUI() {
    const food = this.getFood();

    // Info text
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.font = "13px Arial";
    this.ctx.fillText("Click to move food", 10, this.viewportHeight - 12);

    if (food) {
      // Position indicator
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      this.ctx.font = "11px Arial";
      const stateLabel = food.isAutoMoving ? "  [AUTO 🚀]" : "";
      this.ctx.fillText(
        `Food: (${Math.round(food.x)}, ${Math.round(food.y)})  Camera: (${Math.round(this.cameraX)}, ${Math.round(this.cameraY)})${stateLabel}`,
        10,
        16,
      );
    }

    // Minimap
    this.drawMinimap();
  }

  /**
   * Draw a small minimap showing food position in the world
   */
  private drawMinimap() {
    const minimapWidth = 90;
    const minimapHeight = Math.round(
      (minimapWidth / this.worldWidth) * this.worldHeight,
    );
    const minimapX = this.viewportWidth - minimapWidth - 12;
    const minimapY = 12;

    // Minimap background (use real map image if available)
    if (this.backgroundImage && this.backgroundImage.complete) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.backgroundImage.width,
        this.backgroundImage.height,
        minimapX,
        minimapY,
        minimapWidth,
        minimapHeight,
      );
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      this.ctx.fillRect(minimapX, minimapY, minimapWidth, minimapHeight);
    } else {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fillRect(minimapX, minimapY, minimapWidth, minimapHeight);
    }

    // Viewport rectangle
    const vpX = minimapX + (this.cameraX / this.worldWidth) * minimapWidth;
    const vpY = minimapY + (this.cameraY / this.worldHeight) * minimapHeight;
    const vpW = (this.viewportWidth / this.worldWidth) * minimapWidth;
    const vpH = (this.viewportHeight / this.worldHeight) * minimapHeight;

    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(vpX, vpY, vpW, vpH);

    // Food dot
    const food = this.getFood();
    if (food) {
      const foodMX = minimapX + (food.x / this.worldWidth) * minimapWidth;
      const foodMY = minimapY + (food.y / this.worldHeight) * minimapHeight;

      this.ctx.fillStyle = food.isAutoMoving ? "#00C8FF" : "#FF6B35";
      this.ctx.beginPath();
      this.ctx.arc(foodMX, foodMY, 3.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Border
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(minimapX, minimapY, minimapWidth, minimapHeight);

    // Title
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.ctx.font = "11px Arial";
    this.ctx.fillText("Bản đồ", minimapX, minimapY - 4);
  }

  /**
   * Main game loop
   */
  private gameLoop = () => {
    const now = Date.now();
    const deltaTime = (now - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = now;

    this.update(deltaTime);
    this.render();

    if (this.isRunning) {
      requestAnimationFrame(this.gameLoop);
    }
  };

  /**
   * Start game
   */
  start() {
    this.isRunning = true;
    this.lastTime = Date.now();
    this.gameLoop();
  }

  /**
   * Stop game
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Get world dimensions
   */
  getWorldSize() {
    return { width: this.worldWidth, height: this.worldHeight };
  }

  /**
   * Set world dimensions (update after loading image)
   */
  setWorldSize(width: number, height: number) {
    this.worldWidth = width;
    this.worldHeight = height;
  }

  /**
   * Get viewport dimensions
   */
  getViewportSize() {
    return { width: this.viewportWidth, height: this.viewportHeight };
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stop();
  }
}
