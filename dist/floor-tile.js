export class FloorTile {
    x;
    y;
    width;
    height;
    image;
    speed;
    constructor(x, y, width, height, speed, src) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = src;
    }
    update(ctx) {
        this.x -= this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=floor-tile.js.map