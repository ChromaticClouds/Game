export declare class Player {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    x: number;
    y: number;
    width: number;
    height: number;
    vy: number;
    jumpPower: number;
    gravity: number;
    slideHeight: number;
    isJumping: boolean;
    isSliding: boolean;
    normalHeight: number;
    src: string;
    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement);
    draw(): void;
    update(): void;
    jump(): void;
    slideDown(): void;
    stopSlide(): void;
}
//# sourceMappingURL=plyayer.d.ts.map