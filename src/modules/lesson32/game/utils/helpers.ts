import Phaser from "phaser";

/**
 * Calculate distance between two points
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Generate organ positions for the digestive system
 */
export function generateOrganPositions(
  sceneWidth: number,
  sceneHeight: number
): Array<{ x: number; y: number; name: string }> {
  const positions = [
    { x: sceneWidth * 0.2, y: sceneHeight * 0.2, name: "miệng" },
    { x: sceneWidth * 0.3, y: sceneHeight * 0.4, name: "thực quản" },
    { x: sceneWidth * 0.5, y: sceneHeight * 0.5, name: "dạ dày" },
    { x: sceneWidth * 0.7, y: sceneHeight * 0.6, name: "ruột non" },
    { x: sceneWidth * 0.85, y: sceneHeight * 0.7, name: "ruột già" },
  ];

  return positions;
}

/**
 * Create background graphics for digestive system
 */
export function createGameBackground(
  scene: Phaser.Scene,
  width: number,
  height: number
): Phaser.GameObjects.Graphics {
  const graphics = scene.add.graphics();

  // Background gradient effect
  graphics.fillStyle(0xeeeeee, 1);
  graphics.fillRect(0, 0, width, height);

  // Grid
  graphics.lineStyle(1, 0xdddddd, 0.5);
  for (let x = 0; x < width; x += 50) {
    graphics.lineBetween(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 50) {
    graphics.lineBetween(0, y, width, y);
  }

  return graphics;
}

/**
 * Format digestion stage name for display
 */
export function formatStageName(stageName: string): string {
  const nameMap: Record<string, string> = {
    miệng: "Miệng (Oral)",
    "thực quản": "Thực quản (Esophagus)",
    "dạ dày": "Dạ dày (Stomach)",
    "ruột non": "Ruột non (Small Intestine)",
    "ruột già": "Ruột già (Large Intestine)",
  };

  return nameMap[stageName] || stageName;
}

/**
 * Get stage duration (in ms) by name
 */
export function getStageDuration(stageName: string): number {
  const durations: Record<string, number> = {
    miệng: 2000,
    "thực quản": 1500,
    "dạ dày": 3000,
    "ruột non": 4000,
    "ruột già": 2000,
  };

  return durations[stageName] || 2000;
}

/**
 * Get stage color by name (for visual feedback)
 */
export function getStageColor(stageName: string): number {
  const colors: Record<string, number> = {
    "miệng": 0xff0000, // Red
    "thực quản": 0xffaa00, // Orange
    "dạ dày": 0xff5500, // Dark orange
    "ruột non": 0xffcc00, // Yellow
    "ruột già": 0xaa5500, // Brown
  };

  return colors[stageName] || 0x888888;
}

/**
 * Create a debug text display
 */
export function createDebugText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string = ""
): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, {
    fontSize: "14px",
    color: "#000000",
    backgroundColor: "#ffffff",
    padding: { x: 5, y: 5 },
    wordWrap: { width: 300 },
  });
}
