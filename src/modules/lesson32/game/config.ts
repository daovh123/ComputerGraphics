import Phaser from "phaser";
import { PlayScene } from "./scenes/PlayScene.js";

/**
 * Phaser 3 Game Configuration for Digestive System Game
 */
export const createGameConfig = (canvasParent: HTMLElement): Phaser.Game => {
  const width = Math.max(canvasParent.clientWidth || 1200, 800);
  const height = Math.max(canvasParent.clientHeight || 800, 600);

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: canvasParent,
    width: width,
    height: height,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 300 },
        debug: false,
      },
    },
    scene: [PlayScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      expandParent: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  return new Phaser.Game(config);
};

/**
 * Game constants
 */
export const GAME_CONSTANTS = {
  FOOD_SIZE: 40,
  FOOD_SPEED: 200,
  CAMERA_LERP: 0.1,
  STAGE_TRANSITION_DELAY: 3000,
  DIGESTION_STAGES: [
    { name: "miệng", duration: 2000 },
    { name: "thực quản", duration: 1500 },
    { name: "dạ dày", duration: 3000 },
    { name: "ruột non", duration: 4000 },
    { name: "ruột già", duration: 2000 },
  ] as const,
};
