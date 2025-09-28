export class FloorTile {
    ctx;
    x;
    y;
    width;
    height;
    image;
    floorSpeed;
    constructor(ctx, x, y, width, height, floorSpeed, src) {
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
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=floor-tile.js.map