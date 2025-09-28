/**
 * Game: Simple Jumping Game
 * Description: A simple game where the player jumps over obstacles.
 * Todo: Move anywhere with arrow keys, improve graphics, add sound effects.
 */
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
let gameOver = false;
/**
 * Custom Modules
 */
import { Player } from "../classes/plyayer.js";
import { FloorManager } from "../classes/floor-maganger.js";
import { ObstacleManager } from "../classes/obstacle-manager.js";
import { playerData } from "../data/player.js";
import { ScoreManager } from "../classes/score-manager.js";
/**
 * Game Objects
 */
const player = new Player(canvas, ctx, playerData(canvas));
const floorManager = new FloorManager(ctx, canvas);
const obstacleManager = new ObstacleManager(ctx, canvas);
const scoreManager = new ScoreManager();
const scoreElement = document.getElementById("score");
const gameOverText = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const totalScore = document.getElementById("total-score");
/**
 * Restart Game
 */
restartButton.addEventListener("click", () => {
    location.reload();
});
/**
 * Event Listener - keydown, keyup
 */
window.addEventListener("keydown", (e) => {
    if (gameOver)
        return;
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW")
        player.jump();
    if (e.code === "ArrowDown" || e.code === "KeyS")
        player.slideDown();
});
window.addEventListener("keyup", (e) => {
    if (gameOver)
        return;
    if (e.code === "ArrowDown" || e.code === "KeyS")
        player.stopSlide();
});
/**
 * Game Loop
 */
export const gameLoop = (deltaTime) => {
    if (gameOver) {
        obstacleManager.stop();
        totalScore.textContent = `Score: ${scoreManager.getScore()}`;
        gameOverText.className = "triggered";
        return;
    }
    scoreManager.update(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    floorManager.update();
    player.setState("run");
    player.update(16);
    obstacleManager.update(player);
    gameOver = obstacleManager.gameOver;
    scoreElement.innerText = `${scoreManager.getScore()}`;
    requestAnimationFrame(gameLoop);
};
const mainScreen = document.querySelector(".main-screen");
const playButton = document.getElementById("play-button");
const pointer = document.querySelector('.pointer');
playButton.addEventListener("click", () => {
    inMainMenu = false;
    if (mainMenuId)
        cancelAnimationFrame(mainMenuId);
    scoreManager.reset();
    gameOver = false;
    // Start spawning obstacles
    obstacleManager.startSpawning();
    mainScreen.style = "transform: translateY(-100%)";
    requestAnimationFrame((timestamp) => {
        scoreManager.start(timestamp); // 초기값을 정확히 세팅
        gameLoop(timestamp);
    });
});
playButton.addEventListener('mouseenter', () => {
    pointer.style.display = 'block';
});
playButton.addEventListener('mouseleave', () => {
    pointer.style.display = 'none';
});
let inMainMenu = true;
let mainMenuId = null;
export const mainLoop = () => {
    if (!inMainMenu)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    floorManager.draw();
    player.setState("idle");
    player.update(16);
    mainMenuId = requestAnimationFrame(mainLoop);
};
mainLoop();
//# sourceMappingURL=game.js.map