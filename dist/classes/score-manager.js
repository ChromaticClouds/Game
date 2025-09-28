export class ScoreManager {
    score = 0;
    lastTime = 0;
    start(timestamp) {
        this.score = 0;
        this.lastTime = timestamp;
    }
    update(timestamp) {
        const delta = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.score += delta * 0.01;
    }
    getScore() {
        return Math.floor(this.score);
    }
    reset() {
        this.score = 0;
        this.lastTime = 0;
    }
}
//# sourceMappingURL=score-manager.js.map