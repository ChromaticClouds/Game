import { FloorTile } from "./floor-tile.js";

export class FloorManager {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  tiles: FloorTile[] = [];
  desiredHeight: number;
  floorSpeed: number;
  tileWidth = 0;
  tileHeight = 0;
  floorY: number = 0;
  img: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    desiredHeight = 100,
    floorSpeed = 6
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.desiredHeight = desiredHeight;
    this.floorSpeed = floorSpeed;

    this.img = new Image();
    this.img.src = "../assets/image/floor.png";

    this.img.onload = () => {
      const size = 6;

      const aspectRatio = this.img.width / this.img.height;
      this.tileWidth = this.desiredHeight * aspectRatio * size;
      this.tileHeight = this.desiredHeight * size;
      this.floorY = canvas.height - this.tileHeight;
      
      const count = Math.ceil(canvas.width / this.tileWidth) + 2;
      for (let i = 0; i < count; i++) {
        this.tiles.push(
          new FloorTile(
            ctx,
            i * this.tileWidth,
            this.floorY,
            this.tileWidth,
            this.tileHeight,
            this.floorSpeed,
            this.img.src
          )
        );
      }
    };
  }

  update() {
    this.tiles.forEach((tile) => tile.update());

    if (this.tiles[0] && this.tiles[0].x + this.tileWidth < 0) {
      this.tiles.shift();
      const lastTile = this.tiles[this.tiles.length - 1];
      const lastX = lastTile ? lastTile.x : 0;
      this.tiles.push(
        new FloorTile(
          this.ctx,
          lastX + this.tileWidth,
          this.floorY,
          this.tileWidth,
          this.tileHeight,
          this.floorSpeed,
          this.img.src
        )
      );
    }
  }

  draw() {
    this.tiles.forEach((tile) => tile.draw(this.ctx));
  }
}
