export declare class FloorTile {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    floorSpeed: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, floorSpeed: number, src: string);
    update(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=floor-tile.d.ts.map