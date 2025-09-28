export interface ObstacleConfig {
    name?: string;
    src: string;
    width: number;
    height: number;
    baseY: number;
    hitbox: {
        offsetX: number;
        offsetY: number;
        width: number;
        height: number;
    };
}
/**
 * Base Height: 100
 * Y Position = Canvas Height - Base Height - 100
 *
 * Hitbox offsets are set to 0,0 for simplicity but can be adjusted as needed.
 */
export declare const obstacleConfigs: ObstacleConfig[];
//# sourceMappingURL=obstacles.d.ts.map