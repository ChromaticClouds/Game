import type { Player } from "./plyayer.js";
import { Obstacle } from "./obstable.js";
export declare class ObstacleManager {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    obstacles: Obstacle[];
    gameOver: boolean;
    score: number;
    minSpawn: number;
    maxSpawn: number;
    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, minSpawn?: number, maxSpawn?: number);
    startSpawning(): void;
    private spawnObstacle;
    update(player: Player): void;
    stop(): void;
}
//# sourceMappingURL=obstacle-manager.d.ts.map