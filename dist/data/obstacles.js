/**
 * Base Height: 100
 * Y Position = Canvas Height - Base Height - 100
 *
 * Hitbox offsets are set to 0,0 for simplicity but can be adjusted as needed.
 */
export const obstacleConfigs = [
    {
        name: "Cube",
        src: "../assets/image/obstacles/obstacle1.png",
        width: 32 * 3,
        height: 34 * 3,
        baseY: 90,
        hitbox: { offsetX: 0, offsetY: 0, width: 32 * 3, height: 34 * 3 },
    },
    {
        name: "Drone",
        src: "../assets/image/obstacles/obstacle2.png",
        width: 41 * 3,
        height: 25 * 3,
        baseY: 200,
        hitbox: { offsetX: 10, offsetY: 5, width: 30, height: 25 },
    },
    {
        name: "Drone",
        src: "../assets/image/obstacles/obstacle2.png",
        width: 41 * 3,
        height: 25 * 3,
        baseY: 360,
        hitbox: { offsetX: 10, offsetY: 5, width: 30, height: 25 },
    },
];
//# sourceMappingURL=obstacles.js.map