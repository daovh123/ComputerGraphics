import Phaser from "phaser";
import { Food } from "../objects/Food";
import { Organ } from "../objects/Organ";

/**
 * Main game scene - minimal version to display game
 */
export class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    const graphics = this.add.graphics();
    graphics.fillStyle(0xeeeeee, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.lineStyle(1, 0xdddddd, 0.5);
    for (let x = 0; x < width; x += 50) {
      graphics.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y < height; y += 50) {
      graphics.lineBetween(0, y, width, y);
    }

    // Create organs
    const organs = [
      { x: width * 0.2, y: height * 0.2, name: "miệng" },
      { x: width * 0.3, y: height * 0.4, name: "thực quản" },
      { x: width * 0.5, y: height * 0.5, name: "dạ dày" },
      { x: width * 0.7, y: height * 0.6, name: "ruột non" },
      { x: width * 0.85, y: height * 0.7, name: "ruột già" },
    ];

    organs.forEach((organ) => {
      new Organ(this, organ.x, organ.y, organ.name);
      // Label
      this.add.text(organ.x - 20, organ.y - 40, organ.name, {
        fontSize: "12px",
        color: "#000000",
      });
    });

    // Create food
    new Food(this, width * 0.2, height * 0.2);
  }

  update(): void {
    // Empty for now
  }
}
