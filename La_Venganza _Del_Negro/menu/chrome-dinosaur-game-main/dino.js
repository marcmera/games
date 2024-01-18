let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
    isJumping: false,
    isDucking: false,
};

let obstacles = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

let birdWidth = 64;
let birdHeight = 49;
let birdX = 700;
let birdY = boardHeight - birdHeight - 20;

let birdImg;

let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    birdImg = new Image();
    birdImg.src = "./img/bird.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);

    if (dino.isJumping) {
        dino.y = Math.max(dino.y - 10, dinoY - 100);
        dino.isJumping = false;
    }

    if (dino.isDucking) {
        dino.height = 60;
        dinoY = boardHeight - dino.height;
    } else {
        dino.height = dinoHeight;
        dinoY = boardHeight - dino.height;
    }

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // Obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (detectCollision(dino, obstacle)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            setTimeout(() => {
                alert('Game Over!');
            }, 0);
        }
    }

    // Score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
};

function handleKeyDown(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && !dino.isJumping && !dino.isDucking) {
        dino.isJumping = true;
        velocityY = -10;
    } else if (e.code == "ArrowDown" && !dino.isDucking && dino.y == dinoY) {
        dino.isDucking = true;
    }
};

function handleKeyUp(e) {
    if (e.code == "ArrowDown" && dino.isDucking) {
        dino.isDucking = false;
    }
};

function placeObstacle() {
    if (gameOver) {
        return;
    }

    let obstacle = {
        img: null,
        x: boardWidth,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let placeObstacleChance = Math.random();

    if (placeObstacleChance > 0.85) {
        obstacle.img = birdImg;
        obstacle.width = birdWidth;
        obstacle.y = birdY;
        obstacles.push(obstacle);
    } else if (placeObstacleChance > 0.70) {
        obstacle.img = cactus3Img;
        obstacle.width = cactus3Width;
        obstacles.push(obstacle);
    } else if (placeObstacleChance > 0.45) {
        obstacle.img = cactus2Img;
        obstacle.width = cactus2Width;
        obstacles.push(obstacle);
    } else if (placeObstacleChance > 0.20) {
        obstacle.img = cactus1Img;
        obstacle.width = cactus1Width;
        obstacles.push(obstacle);
    }

    if (obstacles.length > 5) {
        obstacles.shift();
    }
};

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}
