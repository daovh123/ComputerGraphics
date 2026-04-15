/**
 * Main export file for Digestive Game module
 * 
 * Usage:
 * import { DigestiveGame } from './game';
 */

export { DigestiveGame } from "./DigestiveGame";
export { GameEngine, Food, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./engine/GameEngine";
export { CollisionSystem, type Obstacle, type Zone, type Waypoint, type ZonePathMapping, DEFAULT_OBSTACLES, DEFAULT_ZONES, DEFAULT_ZONE_PATH_MAPPINGS, PATH_1, PATH_2, PATH_3, PATH_4 } from "./engine/CollisionSystem";
export { CollisionRectEditor } from "./engine/CollisionRectEditor";

