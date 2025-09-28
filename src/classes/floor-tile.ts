export class FloorTile {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  floorSpeed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    floorSpeed: number,
    src: string
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.floorSpeed = floorSpeed;
    this.image = new Image();
    this.image.src = src;
  }

  update() {
    this.x -= this.floorSpeed;
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
