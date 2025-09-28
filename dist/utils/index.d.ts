import { Player } from "../classes/plyayer.js";
import { Obstacle } from "../classes/obstable.js";
import type { ObstacleConfig } from "../data/obstacles.js";
export declare function checkCollision(player: Player, obstacle: Obstacle): boolean;
export declare const getRandomObstacleConfig: (obstacleConfigs: ObstacleConfig[]) => ObstacleConfig;
export declare const startCountdown: (start: number, element: HTMLElement, callback: () => void) => void;
//# sourceMappingURL=index.d.ts.map