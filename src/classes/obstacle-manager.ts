import type { Player } from "./plyayer.js";
import { Obstacle } from "./obstable.js";
import { checkCollision } from "../utils/index.js";

const crashSound = new Audio('../assets/sound/crash.mp3');

export class ObstacleManager {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  obstacles: Obstacle[] = [];
  gameOver = false;
  score = 0;

  minSpawn: number;
  maxSpawn: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    minSpawn = 300,
    maxSpawn = 1000
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.minSpawn = minSpawn;
    this.maxSpawn = maxSpawn;
  }

  startSpawning() {
    setTimeout(() => this.spawnObstacle(), 3000);
  }

  private spawnObstacle() {
    if (!this.gameOver) {
      this.obstacles.push(new Obstacle(this.ctx, this.canvas));
    }

    const nextSpawn =
      Math.random() * (this.maxSpawn - this.minSpawn) + this.minSpawn;
    setTimeout(() => this.spawnObstacle(), nextSpawn);
  }

  update(player: Player) {
    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.update();

      if (checkCollision(player, obstacle)) {
        crashSound.play();
        this.gameOver = true;
        return false; // 충돌 → 제거
      }

      if (obstacle.x + obstacle.config.width < 0) return false; // 화면 밖 → 제거

      return true; // 유지
    });
  }

  stop() {
    this.gameOver = true;
  }
}
