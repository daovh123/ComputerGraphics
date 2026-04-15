/**
 * Collision Rect Visual Editor
 * Click and drag on canvas to create collision rectangles
 * Copy the output to CollisionSystem.ts DEFAULT_OBSTACLES
 */


type EditorObstacleType = "wall" | "zone";

export class CollisionRectEditor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private cameraX = 0;
  private cameraY = 0;
  private rects: Array<{ x: number; y: number; width: number; height: number; name: string; type: EditorObstacleType }> = [];
  private currentName = "obstacle";
  private currentType: EditorObstacleType = "wall";
  private enabled = false;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.setupInput();
  }

  /**
   * Enable/disable editor
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      console.log(
        "%c[CollisionRectEditor] ENABLED - Click and drag to create obstacles",
        "color: green; font-weight: bold; font-size: 14px"
      );
      console.log("%c[CollisionRectEditor] Press 'C' to copy code to console", "color: green");
    }
  }

  /**
   * Update camera position
   */
  setCameraPosition(x: number, y: number) {
    this.cameraX = x;
    this.cameraY = y;
  }

  /**
   * Setup input events
   */
  private setupInput() {
    this.canvas.addEventListener("mousedown", (e) => {
      if (!this.enabled) return;

      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Convert to world coords
      this.startX = clickX + this.cameraX;
      this.startY = clickY + this.cameraY;
      this.currentX = this.startX;
      this.currentY = this.startY;
      this.isDrawing = true;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.enabled || !this.isDrawing) return;

      const rect = this.canvas.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const moveY = e.clientY - rect.top;

      // Convert to world coords
      this.currentX = moveX + this.cameraX;
      this.currentY = moveY + this.cameraY;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      if (!this.enabled || !this.isDrawing) return;

      this.isDrawing = false;

      const x = Math.min(this.startX, this.currentX);
      const y = Math.min(this.startY, this.currentY);
      const width = Math.abs(this.currentX - this.startX);
      const height = Math.abs(this.currentY - this.startY);

      if (width > 10 && height > 10) {
        this.rects.push({ x, y, width, height, name: this.currentName, type: this.currentType });
        console.log(`✓ Created obstacle: { x: ${x}, y: ${y}, width: ${width}, height: ${height}, name: "${this.currentName}", type: "${this.currentType}" }`);
      }
    });

    // Copy to clipboard on 'C' key
    window.addEventListener("keydown", (e) => {
      if (!this.enabled) return;

      if (e.key.toLowerCase() === "c") {
        this.copyCode();
      }
    });
  }

  /**
   * Draw editor rectangles
   */
  draw() {
    if (!this.enabled) return;

    // Draw all created rectangles
    for (let i = 0; i < this.rects.length; i++) {
      const rect = this.rects[i];
      this.ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

      // Label
      this.ctx.fillStyle = "rgba(0, 255, 0, 1)";
      this.ctx.font = "bold 12px Arial";
      this.ctx.fillText(`${i}: ${rect.name}`, rect.x, rect.y - 5);
    }

    // Draw preview rectangle while dragging
    if (this.isDrawing) {
      const x = Math.min(this.startX, this.currentX);
      const y = Math.min(this.startY, this.currentY);
      const width = Math.abs(this.currentX - this.startX);
      const height = Math.abs(this.currentY - this.startY);

      this.ctx.strokeStyle = "rgba(255, 255, 0, 0.8)";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, width, height);

      this.ctx.fillStyle = "rgba(255, 255, 0, 0.1)";
      this.ctx.fillRect(x, y, width, height);
    }
  }

  /**
   * Generate code snippet
   */
  generateCode(): string {
    let code = "export const DEFAULT_OBSTACLES: Obstacle[] = [\n";

    for (const rect of this.rects) {
      code += `  { x: ${Math.round(rect.x)}, y: ${Math.round(rect.y)}, width: ${Math.round(rect.width)}, height: ${Math.round(
        rect.height
      )}, name: "${rect.name}", type: "${rect.type}" },\n`;
    }

    code += "];";
    return code;
  }

  /**
   * Copy code to clipboard
   */
  private copyCode() {
    const code = this.generateCode();
    navigator.clipboard.writeText(code).then(() => {
      console.log("%c[CollisionRectEditor] Code copied! Paste in CollisionSystem.ts", "color: blue; font-weight: bold");
      console.log(code);
    });
  }

  /**
   * Clear all rectangles
   */
  clear() {
    this.rects = [];
    console.log("[CollisionRectEditor] Cleared all rectangles");
  }

  /**
   * Get all rectangles
   */
  getRects() {
    return this.rects;
  }

  /**
   * Set current name for next obstacle
   */
  setCurrentName(name: string) {
    this.currentName = name;
    console.log(`[CollisionRectEditor] Next obstacle name: "${name}"`);
  }

  /**
   * Set current type for next obstacle
   */
  setCurrentType(type: EditorObstacleType) {
    this.currentType = type;
    console.log(`[CollisionRectEditor] Next obstacle type: "${type}"`);
  }
}
