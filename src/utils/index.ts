import { Player } from "../classes/plyayer.js";
import { Obstacle } from "../classes/obstable.js";
import type { ObstacleConfig } from "src/data/obstacles.js";

export function checkCollision(player: Player, obstacle: Obstacle): boolean {
  const p = player.getHitbox();
  const o = obstacle.getHitbox();

  return !(
    p.x > o.x + o.width ||
    p.x + p.width < o.x ||
    p.y > o.y + o.height ||
    p.y + p.height < o.y
  );
}

export const getRandomObstacleConfig = (
  obstacleConfigs: ObstacleConfig[]
): ObstacleConfig => {
  const idx = Math.floor(Math.random() * obstacleConfigs.length);
  return obstacleConfigs[idx]!;
};
