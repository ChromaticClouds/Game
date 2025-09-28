import { ctx } from "../engine/canvas.js";
import {
  player,
  floorManager,
  mainScreen,
  playButton,
  pointer,
} from "../main.js";
import { startGameLoop } from "./game-loop.js";
import { obstacleManager, scoreManager } from "../main.js";
import { gameState } from "../data/state.js";
import { startCountdown } from "../utils/index.js";

let mainMenuId: number | null = null;

export const startMainMenu = () => {
  const loop = () => {
    if (!gameState.inMainMenu) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    floorManager.draw();
    player.setState("idle");

    player.update(16);

    mainMenuId = requestAnimationFrame(loop);
  };

  loop();

  const countDownElement = document.getElementById(
    "count-down"
  ) as HTMLDivElement;

  const countDownSfx = new Audio('../assets/sound/count-down.mp3');

  playButton.addEventListener("click", () => {
    countDownSfx.play();

    playButton.style.pointerEvents = "none";
    if (mainMenuId) cancelAnimationFrame(mainMenuId);

    scoreManager.reset();
    mainScreen.style.transform = "translateY(-100%)";

    startCountdown(3, countDownElement, () => {
      gameState.inMainMenu = false;
      obstacleManager.startSpawning();
      requestAnimationFrame((timestamp) => {
        scoreManager.start(timestamp);
        startGameLoop(timestamp);
      })
    });
  });

  playButton.addEventListener("mouseenter", () => {
    pointer.style.display = "block";
  });

  playButton.addEventListener("mouseleave", () => {
    pointer.style.display = "none";
  });
};
