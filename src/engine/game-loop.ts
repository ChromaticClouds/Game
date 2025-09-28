import { player, floorManager, obstacleManager, scoreManager, scoreElement, gameOverText, totalScore } from "../main.js";
import { ctx } from "../engine/canvas.js";
import { gameState } from "../data/state.js";

export const startGameLoop = (deltaTime: number) => {
  if (gameState.gameOver) {
    obstacleManager.stop();
    totalScore.textContent = `Score: ${scoreManager.getScore()}`;
    gameOverText.className = "triggered";
    return;
  }

  scoreManager.update(deltaTime);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  floorManager.update();
  player.setState('run');
  player.update(16);

  obstacleManager.update(player);
  gameState.gameOver = obstacleManager.gameOver;

  scoreElement.innerText = `${scoreManager.getScore()}`;
  requestAnimationFrame(startGameLoop);
};
