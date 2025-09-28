import { Player } from "../plyayer.js";
import { Obstacle } from "../obstable.js";
export function checkCollision(player, obstacle) {
    const p = player.getHitbox();
    return !(p.x > obstacle.x + obstacle.width ||
        p.x + p.width < obstacle.x ||
        p.y > obstacle.y + obstacle.height ||
        p.y + p.height < obstacle.y);
}
//# sourceMappingURL=check-collision.js.map