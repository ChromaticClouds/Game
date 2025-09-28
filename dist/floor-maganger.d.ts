import { FloorTile } from "./floor-tile.js";
export declare class FloorManager {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    tiles: FloorTile[];
    desiredHeight: number;
    floorSpeed: number;
    tileWidth: number;
    tileHeight: number;
    floorY: number;
    img: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, desiredHeight?: number, floorSpeed?: number);
    update(): void;
}
//# sourceMappingURL=floor-maganger.d.ts.map