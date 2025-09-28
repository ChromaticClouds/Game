export class Player {
    ctx;
    canvas;
    x;
    y;
    width;
    height;
    vy;
    jumpPower;
    gravity;
    slideHeight;
    isJumping;
    isSliding;
    normalHeight;
    src;
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = 32 * 3;
        this.height = 70 * 3;
        this.x = 100;
        this.y = canvas.height - this.height - 100;
        this.vy = 0;
        this.jumpPower = 12;
        this.gravity = 0.2;
        this.slideHeight = 32 * 2.5; // 슬라이딩 시 낮아진 높이
        this.normalHeight = this.height; // 원래 높이 저장
        this.isJumping = false;
        this.isSliding = false;
        this.src = ".../assets/image/origin-character.png";
    }
    draw() {
        const img = new Image();
        img.src = this.src;
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.isJumping) {
            this.vy -= this.gravity;
            this.y -= this.vy;
            if (this.y >= this.canvas.height - this.height - 100) {
                this.y = this.canvas.height - this.height - 100;
                this.isJumping = false;
                this.vy = 0;
            }
        }
        this.draw();
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.vy = this.jumpPower;
        }
    }
    slideDown() {
        if (!this.isJumping) {
            this.isSliding = true;
            this.height = this.slideHeight; // 낮아진 높이 적용
            this.y = this.canvas.height - this.height - 100; // 땅에 맞춰 위치 보정
        }
    }
    stopSlide() {
        this.isSliding = false;
        this.height = this.normalHeight;
        this.y = this.canvas.height - this.height - 100; // 다시 원래 위치로
    }
}
//# sourceMappingURL=plyayer.js.map