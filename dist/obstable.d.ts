import { type ObstacleConfig } from "./data/obstacles.js";
export declare class Obstacle {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    config: ObstacleConfig;
    x: number;
    y: number;
    speed: number;
    image: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement);
    draw(): void;
    update(): void;
    getHitbox(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
//# sourceMappingURL=obstable.d.ts.map