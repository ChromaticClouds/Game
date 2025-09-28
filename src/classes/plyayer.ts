import type { PlayerData, PlayerState } from "../data/player.js";

const jumpSound = new Audio("../assets/sound/jump.wav");
const slideSound = new Audio("../assets/sound/slide.mp3");

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: PlayerData;

  x: number;
  y: number;
  width: number;
  height: number;

  vy: number = 0;
  isJumping: boolean = false;
  isSliding: boolean = false;

  state: PlayerState = "idle";
  frameIndex: number = 0;
  frameTimer: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    data: PlayerData
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.data = data;

    this.width = 58 * 3;
    this.height = 60 * 3;
    this.x = data.x;
    this.y = data.y;
  }

  // Lock to prevent multiple actions at once
  private actionLock: boolean = false;

  //
  private slideQueued: boolean = false;

  setState(state: PlayerState) {
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
      jumpSound.currentTime = 0;
      jumpSound.play();
    }
  }

  slideDown() {
    if (!this.isJumping && !this.actionLock) {
      this.actionLock = true;
      this.isSliding = true;
      this.height = this.data.slideHeight;
      this.y = this.canvas.height - this.height - 100;
      slideSound.currentTime = 0;
      slideSound.play();
    } else {
      this.slideQueued = true;
    }
  }

  stopSlide() {
    this.isSliding = false;
    this.height = this.data.normalHeight;
    if (!this.isJumping) this.y = this.canvas.height - this.height - 100;
    this.actionLock = false;
    this.slideQueued = false;
  }

  /**
   * @param deltaTime - Time elapsed since last frame in milliseconds
   */
  update(deltaTime: number) {
    if (this.isJumping) {
      this.setState("jump");
      this.height = this.data.jumpHeight;
      this.vy -= this.data.gravity;
      this.y -= this.vy;

      // Enable to slide on 200px height
      const fallThreshold = this.canvas.height - this.data.normalHeight - 200;
      if (this.slideQueued && this.y >= fallThreshold) {
        this.isSliding = true;
        this.isJumping = false;
        this.vy = 0;
        slideSound.currentTime = 0;
        slideSound.play();
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
    } else if (!this.isJumping) {
      this.height = this.data.normalHeight;
      this.y = this.canvas.height - this.height - 100;
      if (this.state !== "idle") this.setState("run");
    }

    const anim = this.data.animations[this.state];
    if (anim.frames.length > 0) {
      this.frameTimer += deltaTime;
      if (this.frameTimer >= anim.frameInterval) {
        this.frameTimer = 0;
        this.frameIndex = (this.frameIndex + 1) % anim.frames.length;
      }

      this.ctx.drawImage(
        anim.frames[this.frameIndex]!,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
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
