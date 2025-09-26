import { FloorTile } from "./classes/floor-tile";
import { canvas, ctx } from "./main";
const floorTiles = [];
const tileWidth = 240;
const tileHeight = 100;
const floorY = canvas.height - tileHeight;
const floorSpeed = 6;
// Initialize floor tiles to cover the canvas width
for (let i = 0; i < Math.ceil(canvas.width / tileWidth) + 2; i++) {
    floorTiles.push(new FloorTile(i * tileWidth, floorY, tileWidth, tileHeight, floorSpeed, "../assets/image/floor.png"));
}
export const updateFloor = () => {
    floorTiles.forEach((tile) => tile.update(ctx));
    // Add new tile if the first tile is out of view
    if (floorTiles[0] && floorTiles[0].x + tileWidth < 0) {
        floorTiles.shift();
        const lastTile = floorTiles[floorTiles.length - 1];
        const lastX = lastTile ? lastTile.x : 0;
        floorTiles.push(new FloorTile(lastX + tileWidth, floorY, tileWidth, tileHeight, floorSpeed, "../assets/image/floor.png"));
    }
};
//# sourceMappingURL=update-floor.js.map