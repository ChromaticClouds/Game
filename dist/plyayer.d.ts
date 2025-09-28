import type { PlayerData, PlayerState } from "./data/player.js";
export declare class Player {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    data: PlayerData;
    x: number;
    y: number;
    width: number;
    height: number;
    vy: number;
    isJumping: boolean;
    isSliding: boolean;
    state: PlayerState;
    frameIndex: number;
    frameTimer: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, data: PlayerData);
    private actionLock;
    private slideQueued;
    setState(state: PlayerState): void;
    jump(): void;
    slideDown(): void;
    stopSlide(): void;
    /**
     * @param deltaTime - Time elapsed since last frame in milliseconds
     */
    update(deltaTime: number): void;
    getHitbox(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
//# sourceMappingURL=plyayer.d.ts.map