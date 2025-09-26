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
 * Player (Character)
 */
class Player {
    x;
    y;
    width;
    height;
    vy;
    jumpPower;
    gravity;
    slideHeight;
    isJumping;
    isSliding;
    normalHeight;
    src;
    constructor() {
        this.width = 32 * 3;
        this.height = 70 * 3;
        this.x = 100;
        this.y = canvas.height - this.height - 100;
        this.vy = 0;
        this.jumpPower = 15;
        this.gravity = 0.7;
        this.slideHeight = 32 * 2.5; // 슬라이딩 시 낮아진 높이
        this.normalHeight = this.height; // 원래 높이 저장
        this.isJumping = false;
        this.isSliding = false;
        this.src = "../assets/image/origin-character.png";
    }
    draw() {
        const img = new Image();
        img.src = this.src;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.isJumping) {
            this.vy -= this.gravity;
            this.y -= this.vy;
            if (this.y >= canvas.height - this.height - 100) {
                this.y = canvas.height - this.height - 100;
                this.isJumping = false;
                this.vy = 0;
            }
        }
        this.draw();
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.vy = this.jumpPower;
        }
    }
    slideDown() {
        if (!this.isJumping) {
            this.isSliding = true;
            this.height = this.slideHeight; // 낮아진 높이 적용
            this.y = canvas.height - this.height - 100; // 땅에 맞춰 위치 보정
        }
    }
    stopSlide() {
        this.isSliding = false;
        this.height = this.normalHeight;
        this.y = canvas.height - this.height - 100; // 다시 원래 위치로
    }
}
/**
 * Floor
 */
class FloorTile {
    x;
    y;
    width;
    height;
    image;
    speed;
    constructor(x, y, width, height, speed, src) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = src;
    }
    update() {
        this.x -= this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
const floorTiles = [];
const desiredHeight = 100; // 바닥 높이를 원하는 값으로 (예: 100px)
let tileWidth = 0;
let tileHeight = desiredHeight;
const floorSpeed = 10;
let floorY = 0;
const img = new Image();
img.src = "../assets/image/floor.png";
img.onload = () => {
    const size = 6;
    const aspectRatio = img.width / img.height;
    tileWidth = desiredHeight * aspectRatio * size;
    tileHeight = desiredHeight * size;
    floorY = canvas.height - tileHeight;
    for (let i = 0; i < Math.ceil(canvas.width / tileWidth) + 2; i++) {
        floorTiles.push(new FloorTile(i * tileWidth, floorY, tileWidth, tileHeight, floorSpeed, img.src));
    }
};
function updateFloor() {
    floorTiles.forEach((tile) => tile.update());
    // Add new tile if the first tile is out of view
    if (floorTiles[0] && floorTiles[0].x + tileWidth < 0) {
        floorTiles.shift();
        const lastTile = floorTiles[floorTiles.length - 1];
        const lastX = lastTile ? lastTile.x : 0;
        floorTiles.push(new FloorTile(lastX + tileWidth, floorY, tileWidth, tileHeight, floorSpeed, img.src));
    }
}
/**
 * Obstacle
 */
class Obstacle {
    x;
    y;
    width;
    height;
    speed;
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = canvas.width;
        this.y = canvas.height - this.height - 100;
        this.speed = 10;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.x -= this.speed;
        this.draw();
    }
}
const player = new Player();
const obstacles = [];
let score = 0;
/**
 * Detect Collision
 */
function checkCollision(player, obstacle) {
    return (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y);
}
const scoreElement = document.getElementById("score");
const gameOverText = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
/**
 * Restart Game
 */
restartButton.addEventListener("click", () => {
    location.reload();
});
/**
 * Game Loop
 */
function gameLoop() {
    if (gameOver) {
        gameOverText.className = "triggered";
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateFloor();
    player.update();
    obstacles.forEach((obstacle, index) => {
        obstacle.update();
        if (checkCollision(player, obstacle)) {
            gameOver = true;
        }
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }
    });
    scoreElement.innerText = `${score}`;
    requestAnimationFrame(gameLoop);
}
/**
 * Event Listener - Jump
 */
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        player.jump();
    }
});
/**
 * Event Listener - Slide
 */
window.addEventListener("keydown", (e) => {
    if (player.isJumping)
        return;
    if (e.code === "ArrowDown" || e.code === "KeyS")
        player.slideDown();
});
window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowDown" || e.code === "KeyS")
        player.stopSlide();
});
/**
 * Generate Obstacles
 */
function spawnObstacle() {
    if (!gameOver) {
        obstacles.push(new Obstacle());
    }
    // Spawn next obstacle at random interval between 500ms to 2500ms
    const nextSpawn = Math.random() * 2000 + 500;
    setTimeout(spawnObstacle, nextSpawn);
}
// Initial call to start spawning obstacles
spawnObstacle();
gameLoop();
//# sourceMappingURL=main.js.map