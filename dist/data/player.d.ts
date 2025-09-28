export type PlayerState = "idle" | "run" | "jump" | "slide";
export interface PlayerAnimation {
    frames: HTMLImageElement[];
    frameInterval: number;
}
export interface PlayerData {
    x: number;
    y: number;
    width: number;
    height: number;
    jumpPower: number;
    gravity: number;
    slideHeight: number;
    normalHeight: number;
    jumpHeight: number;
    animations: Record<PlayerState, PlayerAnimation>;
}
export declare const playerData: (canvas: HTMLCanvasElement) => PlayerData;
//# sourceMappingURL=player.d.ts.map