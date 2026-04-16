/**
 * Collision/Obstacle System
 * Supports walls (block movement) and zones (one-way digestion checkpoints).
 *
 * - Walls: food cannot pass through
 * - Zones: food can enter, but once it leaves, it cannot re-enter
 *          (simulates one-way digestion flow, no reflux)
 * - Waypoints & Paths: predefined coordinate arrays for automated movement
 */

// ─── Types ────────────────────────────────────────────────

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
}

export interface Zone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  triggered: boolean;
  onEnter: () => void;
}

export interface Waypoint {
  x: number;
  y: number;
}

/**
 * Maps a zone ID (or set of zone IDs) to a path.
 * When food enters ANY zone in `zoneIds`, it triggers movement along `path`.
 */
export interface ZonePathMapping {
  zoneIds: string[];
  path: Waypoint[];
  name: string;
}

// ─── CollisionSystem Class ────────────────────────────────

export class CollisionSystem {
  private obstacles: Obstacle[] = [];
  private zones: Zone[] = [];
  private zonePathMappings: ZonePathMapping[] = [];
  private debugMode = false;

  /**
   * Track which zones the food is currently inside.
   */
  private currentlyInZones: Set<string> = new Set();

  /**
   * Track which zones the food has passed through (entered and then exited).
   * These zones become walls to prevent backward movement (anti-reflux).
   */
  private passedZones: Set<string> = new Set();

  constructor(debugMode = false) {
    this.debugMode = debugMode;
  }

  // ─── Obstacle (Wall) Management ─────────────────────────

  addObstacle(obstacle: Obstacle) {
    this.obstacles.push(obstacle);
  }

  addObstacles(obstacles: Obstacle[]) {
    this.obstacles.push(...obstacles);
  }

  setObstacles(obstacles: Obstacle[]) {
    this.obstacles = [...obstacles];
  }

  getObstacles() {
    return this.obstacles;
  }

  // ─── Zone Management ────────────────────────────────────

  addZone(zone: Zone) {
    this.zones.push(zone);
  }

  addZones(zones: Zone[]) {
    this.zones.push(...zones);
  }

  setZones(zones: Zone[]) {
    this.zones = [...zones];
    this.resetZoneState();
  }

  getZones() {
    return this.zones;
  }

  // ─── Zone-Path Mapping ──────────────────────────────────

  addZonePathMapping(mapping: ZonePathMapping) {
    this.zonePathMappings.push(mapping);
  }

  addZonePathMappings(mappings: ZonePathMapping[]) {
    this.zonePathMappings.push(...mappings);
  }

  getZonePathMappings() {
    return this.zonePathMappings;
  }

  /**
   * Find the path associated with a zone ID.
   * Returns the ZonePathMapping if found, null otherwise.
   */
  getPathForZone(zoneId: string): ZonePathMapping | null {
    for (const mapping of this.zonePathMappings) {
      if (mapping.zoneIds.includes(zoneId)) {
        return mapping;
      }
    }
    return null;
  }

  /**
   * Reset all zone tracking state (e.g., when restarting)
   */
  resetZoneState() {
    this.currentlyInZones.clear();
    this.passedZones.clear();
    for (const zone of this.zones) {
      zone.triggered = false;
    }
  }

  /**
   * Check if a zone has been passed (food entered and left)
   */
  isZonePassed(zoneId: string): boolean {
    return this.passedZones.has(zoneId);
  }

  /**
   * Check whether a zone has ever been entered in this run.
   */
  hasEnteredZone(zoneId: string): boolean {
    const zone = this.zones.find((z) => z.id === zoneId);
    if (!zone) return false;

    return (
      zone.triggered ||
      this.currentlyInZones.has(zoneId) ||
      this.passedZones.has(zoneId)
    );
  }

  /**
   * Check if a circle is currently inside a specific zone.
   */
  isInsideZone(zoneId: string, x: number, y: number, radius: number): boolean {
    const zone = this.zones.find((z) => z.id === zoneId);
    if (!zone) return false;

    return this.circleRectCollision(x, y, radius, zone);
  }

  /**
   * Manually mark a zone as passed (used when auto-path completes)
   */
  markZoneAsPassed(zoneId: string) {
    this.currentlyInZones.delete(zoneId);
    this.passedZones.add(zoneId);
  }

  // ─── Collision Detection ────────────────────────────────

  /**
   * Check if position collides with any WALL obstacle.
   * Also checks passed zones that now act as walls (anti-reflux).
   */
  isCollidingWithWall(x: number, y: number, radius: number): boolean {
    // Check wall obstacles
    for (const obs of this.obstacles) {
      if (this.circleRectCollision(x, y, radius, obs)) {
        return true;
      }
    }

    // Check passed zones (they become walls after food exits them)
    for (const zone of this.zones) {
      if (
        this.passedZones.has(zone.id) &&
        !this.currentlyInZones.has(zone.id)
      ) {
        if (this.circleRectCollision(x, y, radius, zone)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Update zone tracking based on food position.
   * Call this every frame after moving food.
   *
   * Returns the zone the food just entered (if any), or null.
   */
  updateZoneTracking(x: number, y: number, radius: number): Zone | null {
    let newlyEnteredZone: Zone | null = null;

    for (const zone of this.zones) {
      const isInside = this.circleRectCollision(x, y, radius, zone);

      if (isInside) {
        if (!this.currentlyInZones.has(zone.id)) {
          // Food just entered this zone
          this.currentlyInZones.add(zone.id);

          if (!zone.triggered) {
            // First time entering — fire event
            zone.triggered = true;
            newlyEnteredZone = zone;
            zone.onEnter();

            if (this.debugMode) {
              console.log(`🟢 Entered zone: ${zone.name} (${zone.id})`);
            }
          }
        }
      } else {
        if (this.currentlyInZones.has(zone.id)) {
          // Food just left this zone — mark as passed (becomes wall)
          this.currentlyInZones.delete(zone.id);
          this.passedZones.add(zone.id);

          if (this.debugMode) {
            console.log(
              `🔒 Passed zone: ${zone.name} (${zone.id}) — now blocks backward movement`,
            );
          }
        }
      }
    }

    return newlyEnteredZone;
  }

  /**
   * Resolve movement: try to move from (fromX, fromY) to (toX, toY).
   * Returns the valid position after collision resolution.
   *
   * Strategy:
   *  1. First try full movement
   *  2. If blocked, try sliding along X axis only
   *  3. If blocked, try sliding along Y axis only
   *  4. If all blocked, stay at original position
   */
  resolveMovement(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    radius: number,
  ): { x: number; y: number; blocked: boolean } {
    // Try full movement
    if (!this.isCollidingWithWall(toX, toY, radius)) {
      return { x: toX, y: toY, blocked: false };
    }

    // Try sliding along X only
    if (!this.isCollidingWithWall(toX, fromY, radius)) {
      return { x: toX, y: fromY, blocked: false };
    }

    // Try sliding along Y only
    if (!this.isCollidingWithWall(fromX, toY, radius)) {
      return { x: fromX, y: toY, blocked: false };
    }

    // Fully blocked — stay in place
    return { x: fromX, y: fromY, blocked: true };
  }

  /**
   * Legacy: Check if point collides with any obstacle (walls only)
   */
  isColliding(x: number, y: number, radius: number): boolean {
    return this.isCollidingWithWall(x, y, radius);
  }

  /**
   * Circle-Rectangle collision detection
   */
  private circleRectCollision(
    cx: number,
    cy: number,
    radius: number,
    rect: { x: number; y: number; width: number; height: number },
  ): boolean {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));

    const dx = cx - closestX;
    const dy = cy - closestY;

    return dx * dx + dy * dy < radius * radius;
  }

  // ─── Debug Drawing ──────────────────────────────────────

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.debugMode) return;

    // Draw wall obstacles
    for (const obs of this.obstacles) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

      if (obs.name) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`🧱 ${obs.name}`, obs.x + 4, obs.y - 5);
      }
    }

    // Draw zones
    for (const zone of this.zones) {
      let strokeColor: string;
      let fillColor: string;
      let label: string;

      if (
        this.passedZones.has(zone.id) &&
        !this.currentlyInZones.has(zone.id)
      ) {
        // Passed zone (now acts as wall)
        strokeColor = "rgba(128, 0, 128, 0.7)";
        fillColor = "rgba(128, 0, 128, 0.15)";
        label = `🔒 ${zone.name} (passed — blocks backward)`;
      } else if (this.currentlyInZones.has(zone.id)) {
        // Currently inside zone
        strokeColor = "rgba(0, 200, 0, 0.8)";
        fillColor = "rgba(0, 200, 0, 0.15)";
        label = `🟢 ${zone.name} (inside)`;
      } else {
        // Zone not yet entered
        strokeColor = "rgba(255, 165, 0, 0.7)";
        fillColor = "rgba(255, 165, 0, 0.1)";
        label = `⚡ ${zone.name}`;
      }

      // Fill
      ctx.fillStyle = fillColor;
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

      // Stroke
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

      // Label
      ctx.fillStyle = strokeColor;
      ctx.font = "bold 12px Arial";
      ctx.fillText(label, zone.x + 4, zone.y - 5);
    }

    // Draw paths (waypoints)
    for (const mapping of this.zonePathMappings) {
      const path = mapping.path;
      if (path.length < 2) continue;

      // Draw the path line
      ctx.strokeStyle = "rgba(0, 200, 255, 0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw waypoint dots
      for (let i = 0; i < path.length; i++) {
        const wp = path[i];
        const isStart = i === 0;
        const isEnd = i === path.length - 1;

        ctx.beginPath();
        ctx.arc(wp.x, wp.y, isStart || isEnd ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isStart
          ? "rgba(0, 255, 100, 0.8)" // green = start
          : isEnd
            ? "rgba(255, 50, 50, 0.8)" // red = end
            : "rgba(0, 200, 255, 0.8)"; // cyan = intermediate
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Path label at start
      ctx.fillStyle = "rgba(0, 200, 255, 0.9)";
      ctx.font = "bold 11px Arial";
      ctx.fillText(`📍 ${mapping.name}`, path[0].x + 10, path[0].y - 8);
    }
  }

  /**
   * Enable debug mode
   */
  setDebugMode(enabled: boolean) {
    this.debugMode = enabled;
  }

  isDebugMode(): boolean {
    return this.debugMode;
  }
}

// ─── DEFAULT DATA ─────────────────────────────────────────

export const DEFAULT_OBSTACLES: Obstacle[] = [
  { x: 1587, y: 108, width: 243, height: 78, name: "wall_2" },
  { x: 1353, y: 180, width: 687, height: 150, name: "wall_3" },
  { x: 1149, y: 336, width: 1086, height: 270, name: "wall_4" },
  { x: 1041, y: 603, width: 1332, height: 474, name: "wall_5" },
  { x: 1887, y: 1086, width: 135, height: 459, name: "wall_6" },
  { x: 1857, y: 1560, width: 135, height: 1272, name: "wall_7" },
  { x: 1998, y: 2052, width: 354, height: 222, name: "wall_8" },
  { x: 1989, y: 2277, width: 1257, height: 825, name: "wall_9" },
  { x: 2361, y: 2133, width: 315, height: 144, name: "wall_10" },
  { x: 2673, y: 2187, width: 285, height: 84, name: "wall_11" },
  { x: 1992, y: 1905, width: 198, height: 135, name: "wall_12" },
  { x: 2016, y: 1074, width: 327, height: 129, name: "wall_13" },
  { x: 2157, y: 1200, width: 102, height: 144, name: "wall_14" },
  { x: 2079, y: 1335, width: 141, height: 57, name: "wall_15" },
  { x: 2022, y: 1410, width: 69, height: 126, name: "wall_16" },
  { x: 2100, y: 1389, width: 57, height: 87, name: "wall_17" },
  { x: 2235, y: 402, width: 120, height: 204, name: "wall_18" },
  { x: 2043, y: 234, width: 153, height: 96, name: "wall_19" },
  { x: 1825, y: 114, width: 171, height: 66, name: "wall_20" },
  { x: 1399, y: 141, width: 171, height: 24, name: "wall_21" },
  { x: 1189, y: 246, width: 168, height: 84, name: "wall_22" },
  { x: 1393, y: 102, width: 201, height: 75, name: "wall_23" },
  { x: 1075, y: 369, width: 75, height: 225, name: "wall_24" },
  { x: 888, y: 1032, width: 285, height: 123, name: "wall_26" },
  { x: 53, y: 1032, width: 830, height: 123, name: "wall_86" },
  { x: 53, y: 1548, width: 1050, height: 156, name: "wall_87" },
  { x: 53, y: 1160, width: 50, height: 380, name: "wall_88" },
  { x: 1095, y: 1548, width: 576, height: 156, name: "wall_27" },
  { x: 1452, y: 1695, width: 183, height: 1614, name: "wall_28" },
  { x: 1827, y: 1818, width: 39, height: 930, name: "wall_29" },
  { x: 1635, y: 1692, width: 21, height: 456, name: "wall_31" },
  { x: 1182, y: 2022, width: 267, height: 1284, name: "wall_32" },
  { x: 825, y: 2127, width: 348, height: 1185, name: "wall_33" },
  { x: 484, y: 2220, width: 335, height: 1363, name: "wall_34" },
  { x: 219, y: 2503, width: 278, height: 2400, name: "wall_35" },
  { x: 287, y: 2332, width: 210, height: 180, name: "wall_36" },
  { x: 146, y: 3163, width: 471, height: 3352, name: "wall_37" },
  { x: 64, y: 3279, width: 99, height: 3227, name: "wall_38" },
  { x: 596, y: 6020, width: 1054, height: 725, name: "wall_39" },
  { x: 1832, y: 5982, width: 1560, height: 733, name: "wall_40" },
  { x: 2522, y: 3097, width: 904, height: 2692, name: "wall_41" },
  { x: 1904, y: 5737, width: 1470, height: 373, name: "wall_42" },
  { x: 619, y: 5643, width: 1002, height: 476, name: "wall_44" },
  { x: 631, y: 3586, width: 240, height: 2040, name: "wall_45" },
  { x: 2080, y: 3093, width: 73, height: 90, name: "wall_46" },
  { x: 2157, y: 3106, width: 82, height: 137, name: "wall_47" },
  { x: 2247, y: 3106, width: 99, height: 188, name: "wall_48" },
  { x: 2350, y: 3089, width: 180, height: 270, name: "wall_50" },
  { x: 2419, y: 3350, width: 111, height: 64, name: "wall_51" },
  { x: 1874, y: 2823, width: 120, height: 107, name: "wall_52" },
  { x: 1900, y: 2930, width: 94, height: 112, name: "wall_53" },
  { x: 1639, y: 2832, width: 47, height: 488, name: "wall_54" },
  { x: 1690, y: 3024, width: 43, height: 309, name: "wall_55" },
  { x: 1742, y: 3222, width: 124, height: 94, name: "wall_56" },
  { x: 1733, y: 3114, width: 73, height: 99, name: "wall_57" },
  { x: 1862, y: 3264, width: 81, height: 82, name: "wall_58" },
  { x: 841, y: 3360, width: 1175, height: 266, name: "wall_60" },
  { x: 850, y: 3617, width: 1140, height: 120, name: "wall_61" },
  { x: 854, y: 3729, width: 939, height: 60, name: "wall_62" },
  { x: 867, y: 3780, width: 364, height: 317, name: "wall_63" },
  { x: 1223, y: 3780, width: 184, height: 82, name: "wall_64" },
  { x: 859, y: 4080, width: 77, height: 733, name: "wall_65" },
  { x: 854, y: 5545, width: 377, height: 111, name: "wall_66" },
  { x: 2136, y: 5652, width: 424, height: 115, name: "wall_67" },
  { x: 2436, y: 5437, width: 98, height: 266, name: "wall_68" },
  { x: 2350, y: 5587, width: 107, height: 82, name: "wall_69" },
  { x: 2487, y: 5240, width: 103, height: 206, name: "wall_70" },
  { x: 1433, y: 4036, width: 1136, height: 43, name: "wall_71" },
  { x: 2470, y: 3813, width: 142, height: 261, name: "wall_72" },
  { x: 2406, y: 3963, width: 146, height: 77, name: "wall_73" },
  { x: 1120, y: 4097, width: 154, height: 352, name: "wall_74" },
  { x: 1377, y: 4033, width: 107, height: 223, name: "wall_75" },
  { x: 1493, y: 4260, width: 86, height: 240, name: "wall_76" },
  { x: 1270, y: 4337, width: 77, height: 125, name: "wall_77" },
  { x: 1249, y: 5537, width: 600, height: 95, name: "wall_78" },
  { x: 1206, y: 5537, width: 103, height: 95, name: "wall_79" },
  { x: 2299, y: 4434, width: 64, height: 879, name: "wall_80" },
  { x: 2243, y: 5292, width: 69, height: 171, name: "wall_81" },
  { x: 1836, y: 5472, width: 416, height: 47, name: "wall_82" },
  { x: 2213, y: 5420, width: 47, height: 60, name: "wall_83" },
  { x: 1819, y: 5493, width: 274, height: 69, name: "wall_84" },
  { x: 2333, y: 4438, width: 200, height: 30, name: "wall_85" },
];

export const DEFAULT_ZONES: Zone[] = [
  {
    id: "zone_1",
    x: 1089,
    y: 1158,
    width: 72,
    height: 400,
    name: "zone_1",
    triggered: false,
    onEnter: () => {
      /* TODO: sự kiện khi vào zone_1 */
    },
  },
  {
    id: "zone_2",
    x: 1977,
    y: 3282,
    width: 291,
    height: 60,
    name: "zone_2",
    triggered: false,
    onEnter: () => {
      /* TODO: sự kiện khi vào zone_2 */
    },
  },
  {
    id: "zone_3",
    x: 1337,
    y: 4356,
    width: 189,
    height: 126,
    name: "zone_3",
    triggered: false,
    onEnter: () => {
      /* TODO: sự kiện khi vào zone_3 */
    },
  },
  {
    id: "zone_4",
    x: 961,
    y: 4477,
    width: 150,
    height: 1046,
    name: "zone_4",
    triggered: false,
    onEnter: () => {
      /* TODO: sự kiện khi vào zone_4 */
    },
  },
  {
    id: "zone_5",
    x: 1613,
    y: 4229,
    width: 660,
    height: 248,
    name: "zone_5",
    triggered: false,
    onEnter: () => {
      /* TODO: sự kiện khi vào zone_5 */
    },
  },
];

// ─── Waypoint Paths ───────────────────────────────────────

export const PATH_1: Waypoint[] = [
  { x: 1098, y: 1377 }, // start
  { x: 1211, y: 1366 },
  { x: 1313, y: 1384 },
  { x: 1387, y: 1419 }, // end
];

export const PATH_2: Waypoint[] = [
  { x: 2171, y: 3364 }, // start
  { x: 2224, y: 3477 },
  { x: 2209, y: 3586 },
  { x: 2199, y: 3699 },
  { x: 2121, y: 3798 }, // end
];

export const PATH_3: Waypoint[] = [
  { x: 1408, y: 4348 }, // start
  { x: 1437, y: 4479 },
  { x: 1493, y: 4574 },
  { x: 1557, y: 4684 },
  { x: 1609, y: 4793 },
  { x: 1662, y: 4864 },
  { x: 1694, y: 4906 }, // end
];

export const PATH_4: Waypoint[] = [
  { x: 1052, y: 5351 }, // start
  { x: 1020, y: 5181 },
  { x: 1027, y: 5001 },
  { x: 1041, y: 4878 },
  { x: 1045, y: 4744 },
  { x: 1045, y: 4624 },
  { x: 1066, y: 4483 },
  { x: 1077, y: 4363 },
  { x: 1112, y: 4257 },
  { x: 1207, y: 4278 },
  { x: 1528, y: 4338 },
  { x: 1701, y: 4352 },
  { x: 1895, y: 4348 },
  { x: 2019, y: 4317 },
  { x: 2259, y: 4303 },
  { x: 2397, y: 4242 },
  { x: 2439, y: 4370 },
  { x: 2457, y: 4518 }, // end
];

// ─── Zone → Path Mappings ─────────────────────────────────
// Defines which zone(s) trigger which path.

export const DEFAULT_ZONE_PATH_MAPPINGS: ZonePathMapping[] = [
  { zoneIds: ["zone_1"], path: PATH_1, name: "Path 1 (zone_1)" },
  { zoneIds: ["zone_2"], path: PATH_2, name: "Path 2 (zone_2)" },
  { zoneIds: ["zone_3"], path: PATH_3, name: "Path 3 (zone_3)" },
  {
    zoneIds: ["zone_4", "zone_5"],
    path: PATH_4,
    name: "Path 4 (zone_4/zone_5)",
  },
];
