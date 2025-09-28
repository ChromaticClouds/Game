export class ScoreManager {
  private score: number = 0;
  private lastTime: number = 0;

  start(timestamp: number) {
    this.score = 0;
    this.lastTime = timestamp;
  }

  update(timestamp: number) {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.score += delta * 0.01;
  }

  getScore(): number {
    return Math.floor(this.score);
  }

  reset() {
    this.score = 0;
    this.lastTime = 0;
  }
}