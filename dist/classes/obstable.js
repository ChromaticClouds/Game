import { obstacleConfigs } from "../data/obstacles.js";
import { getRandomObstacleConfig } from "../utils/index.js";
export class Obstacle {
    ctx;
    canvas;
    config;
    x;
    y;
    speed;
    image;
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.config = getRandomObstacleConfig(obstacleConfigs);
        this.x = canvas.width;
        this.y = canvas.height - this.config.baseY - 100;
        this.speed = 6;
        this.image = new Image();
        this.image.src = this.config.src;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.config.width, this.config.height);
    }
    update() {
        this.x -= this.speed;
        this.draw();
    }
    getHitbox() {
        const { offsetX, offsetY, width, height } = this.config.hitbox;
        return {
            x: this.x + offsetX,
            y: this.y + offsetY,
            width,
            height,
        };
    }
}
//# sourceMappingURL=obstable.js.map