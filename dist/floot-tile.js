export class FloorTile {
    ctx;
    x;
    y;
    width;
    height;
    image;
    speed;
    constructor(ctx, x, y, width, height, speed, src) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = src;
    }
    update() {
        this.x -= this.speed;
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=floot-tile.js.map