import { ctx } from "../engine/canvas.js";
import { player, floorManager, mainScreen, playButton, pointer } from "../main.js";
import { startGameLoop } from "./game-loop.js";
import { obstacleManager, scoreManager } from "../main.js";
import { gameState } from "../data/state.js";

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

  playButton.addEventListener("click", () => {
    gameState.inMainMenu = false;
    if (mainMenuId) cancelAnimationFrame(mainMenuId);

    scoreManager.reset();
    obstacleManager.startSpawning();
    mainScreen.style.transform = "translateY(-100%)";

    requestAnimationFrame((timestamp) => {
      scoreManager.start(timestamp);
      startGameLoop(timestamp);
    });
  });

  playButton.addEventListener("mouseenter", () => { pointer.style.display = "block"; });
  playButton.addEventListener("mouseleave", () => { pointer.style.display = "none"; });
};
