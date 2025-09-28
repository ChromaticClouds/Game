import { Player } from "../classes/plyayer.js";
import { Obstacle } from "../classes/obstable.js";
export function checkCollision(player, obstacle) {
    const p = player.getHitbox();
    const o = obstacle.getHitbox();
    return !(p.x > o.x + o.width ||
        p.x + p.width < o.x ||
        p.y > o.y + o.height ||
        p.y + p.height < o.y);
}
export const getRandomObstacleConfig = (obstacleConfigs) => {
    const idx = Math.floor(Math.random() * obstacleConfigs.length);
    return obstacleConfigs[idx];
};
export const startCountdown = (start, element, callback) => {
    let counter = start;
    let lastTime = performance.now();
    element.classList.remove("hidden");
    element.textContent = `${counter}`;
    const interval = 375;
    const tick = (now) => {
        if (now - lastTime >= interval) {
            lastTime = now;
            counter--;
            if (counter > 0) {
                element.textContent = `${counter}`;
            }
            else {
                element.textContent = "Go!";
                setTimeout(() => {
                    element.classList.add("hidden");
                    callback();
                }, interval);
                return; // 종료
            }
        }
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
//# sourceMappingURL=index.js.map