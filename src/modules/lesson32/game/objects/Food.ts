import Phaser from "phaser";

/**
 * Food object - simple rectangle representing food
 */
export class Food extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Ensure texture exists
    if (!scene.textures.exists("food")) {
      Food.createGraphics(scene);
    }
    
    super(scene, x, y, "food");

    // Add to scene
    scene.add.existing(this);
  }

  /**
   * Create simple graphics for food
   */
  static createGraphics(scene: Phaser.Scene): void {
    if (scene.textures.exists("food")) return;
    
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xff6b35, 1); // Orange
    graphics.fillCircle(20, 20, 20);
    graphics.generateTexture("food", 40, 40);
    graphics.destroy();
  }
}
