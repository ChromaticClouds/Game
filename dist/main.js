/**
 * Game: Simple Jumping Game
 * Description: A simple game where the player jumps over obstacles.
 * Todo: Move anywhere with arrow keys, improve graphics, add sound effects.
 */
import { canvas, ctx } from "./engine/canvas.js";
import { Player } from "./classes/plyayer.js";
import { FloorManager } from "./classes/floor-maganger.js";
import { ObstacleManager } from "./classes/obstacle-manager.js";
import { playerData } from "./data/player.js";
import { ScoreManager } from "./classes/score-manager.js";
import { setupInput } from "./engine/input.js";
import { startMainMenu } from "./engine/main-menu.js";
// --- 게임 객체 초기화 ---
export const player = new Player(canvas, ctx, playerData(canvas));
export const floorManager = new FloorManager(ctx, canvas);
export const obstacleManager = new ObstacleManager(ctx, canvas);
export const scoreManager = new ScoreManager();
// --- UI 요소 ---
export const scoreElement = document.getElementById("score");
export const gameOverText = document.getElementById("game-over");
export const restartButton = document.getElementById("restart-button");
export const totalScore = document.getElementById("total-score");
export const mainScreen = document.querySelector(".main-screen");
export const playButton = document.getElementById("play-button");
export const pointer = document.querySelector('.pointer');
// --- 입력 이벤트 바인딩 ---
setupInput();
// --- 메인 메뉴 시작 ---
startMainMenu();
// --- 재시작 버튼 ---
restartButton.addEventListener("click", () => location.reload());
//# sourceMappingURL=main.js.map