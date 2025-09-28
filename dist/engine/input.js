import { player } from "../main.js";
import { gameState } from "../data/state.js";
export const setupInput = () => {
    window.addEventListener("keydown", (e) => {
        if (gameState.gameOver || gameState.inMainMenu)
            return;
        if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW")
            player.jump();
        if (e.code === "ArrowDown" || e.code === "KeyS")
            player.slideDown();
    });
    window.addEventListener("keyup", (e) => {
        if (gameState.gameOver || gameState.inMainMenu)
            return;
        if (e.code === "ArrowDown" || e.code === "KeyS")
            player.stopSlide();
    });
};
//# sourceMappingURL=input.js.map