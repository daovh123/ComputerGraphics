import Phaser from "phaser";

/**
 * Organ object - simple display element
 */
export class Organ extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    // Create texture if needed
    if (!scene.textures.exists(`organ_${name}`)) {
      Organ.createGraphics(scene, name);
    }

    super(scene, x, y, `organ_${name}`);
    
    // Add to scene
    scene.add.existing(this);
  }

  /**
   * Create simple graphics for organs
   */
  static createGraphics(scene: Phaser.Scene, organName: string): void {
    const key = `organ_${organName}`;
    if (scene.textures.exists(key)) return;

    const graphics = scene.add.graphics();
    
    // Simple colored rectangles for each organ
    switch (organName) {
      case "miệng":
        graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(0, 0, 50, 30);
        graphics.generateTexture(key, 50, 30);
        break;
      case "thực quản":
        graphics.fillStyle(0xffaa00, 1);
        graphics.fillRect(0, 0, 20, 60);
        graphics.generateTexture(key, 20, 60);
        break;
      case "dạ dày":
        graphics.fillStyle(0xff5500, 1);
        graphics.fillCircle(30, 30, 30);
        graphics.generateTexture(key, 60, 60);
        break;
      case "ruột non":
        graphics.fillStyle(0xffcc00, 1);
        graphics.fillRect(0, 0, 80, 30);
        graphics.generateTexture(key, 80, 30);
        break;
      case "ruột già":
        graphics.fillStyle(0xaa5500, 1);
        graphics.fillRect(0, 0, 60, 40);
        graphics.generateTexture(key, 60, 40);
        break;
      default:
        graphics.fillStyle(0x888888, 1);
        graphics.fillCircle(25, 25, 25);
        graphics.generateTexture(key, 50, 50);
    }

    graphics.destroy();
  }
}
