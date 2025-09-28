export class Player {
    canvas;
    ctx;
    data;
    x;
    y;
    width;
    height;
    vy = 0;
    isJumping = false;
    isSliding = false;
    state = "idle";
    frameIndex = 0;
    frameTimer = 0;
    constructor(canvas, ctx, data) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.data = data;
        this.width = 58 * 3;
        this.height = 60 * 3;
        this.x = data.x;
        this.y = data.y;
    }
    // Lock to prevent multiple actions at once
    actionLock = false;
    //
    slideQueued = false;
    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.frameIndex = 0;
            this.frameTimer = 0;
        }
    }
    jump() {
        if (!this.isJumping && !this.actionLock) {
            this.actionLock = true;
            this.isJumping = true;
            this.vy = this.data.jumpPower;
        }
    }
    slideDown() {
        if (!this.isJumping && !this.actionLock) {
            this.actionLock = true;
            this.isSliding = true;
            this.height = this.data.slideHeight;
            this.y = this.canvas.height - this.height - 100;
        }
        else {
            this.slideQueued = true;
        }
    }
    stopSlide() {
        this.isSliding = false;
        this.height = this.data.normalHeight;
        if (!this.isJumping)
            this.y = this.canvas.height - this.height - 100;
        this.actionLock = false;
        this.slideQueued = false;
    }
    /**
     * @param deltaTime - Time elapsed since last frame in milliseconds
     */
    update(deltaTime) {
        if (this.isJumping) {
            this.setState("jump");
            this.height = this.data.jumpHeight;
            this.vy -= this.data.gravity;
            this.y -= this.vy;
            const fallThreshold = this.canvas.height - this.data.normalHeight - 200; // 200px 위에서 슬라이드 가능
            if (this.slideQueued && this.y >= fallThreshold) {
                this.isSliding = true;
                this.slideDown();
                this.isJumping = false;
                this.vy = 0;
            }
            if (this.y >= this.canvas.height - this.height - 100) {
                this.y = this.canvas.height - this.height - 100;
                this.isJumping = false;
                this.height = this.data.normalHeight;
                this.vy = 0;
                this.setState("run");
                this.actionLock = false;
            }
        }
        if (this.isSliding) {
            this.height = this.data.slideHeight;
            this.y = this.canvas.height - this.height - 100;
            this.setState("slide");
        }
        else if (!this.isJumping) {
            this.height = this.data.normalHeight;
            this.y = this.canvas.height - this.height - 100;
            this.setState("run");
        }
        const anim = this.data.animations[this.state];
        this.frameTimer += deltaTime;
        if (this.frameTimer >= anim.frameInterval) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % anim.frames.length;
        }
        this.ctx.drawImage(anim.frames[this.frameIndex], this.x, this.y, this.width, this.height);
    }
    getHitbox() {
        const shrinkX = this.width * 0.6;
        return {
            x: this.x + shrinkX / 2,
            y: this.y,
            width: this.width - shrinkX,
            height: this.height,
        };
    }
}
//# sourceMappingURL=plyayer.js.map