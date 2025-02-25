// mit Hilfe von KI geschrieben

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscoreDisplay'); 
const pauseButton = document.getElementById('pauseButton');
let gameLoopInterval;
const slowButton = document.getElementById('slowButton');
const normalButton = document.getElementById('normalButton');
const fastButton = document.getElementById('fastButton');
let score = 0;
let rows = 20;
let cols = 20;
let snake = [{ x: 20, y: 20 }];
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "LEFT";
let foodCollected = false;
let isPaused = false;
let highscore = localStorage.getItem('highscore') || 0;
highscoreDisplay.textContent = 'Highscore: ' + highscore;

document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('highscore');
        console.log('Highscore wurde zurückgesetzt.');
    });
});

let cakeImage = new Image();
cakeImage.src = "/img/cake.png";

cakeImage.onload = function() {
    console.log("Kuchenbild geladen!");
};

function drawFood() {
    let scale = 1.9; 
    let cakeWidth = cellWidth * scale;
    let cakeHeight = cellHeight * scale;

    ctx.drawImage(
        cakeImage,
        food.x * cellWidth - (cakeWidth - cellWidth) / 2,
        food.y * cellHeight - (cakeHeight - cellHeight) / 2,
        cakeWidth,
        cakeHeight
    );
}

placeFood();
setInterval(gameLoop, 140);
document.addEventListener("keydown", keyDown);
draw();
pauseButton.addEventListener('click', togglePause);

function togglePause() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Fortsetzen' : 'Pause';
    if (!isPaused) {
        gameLoop(); 
    }
}  
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
        togglePause();
    }
});

function draw() {
    ctx.fillStyle = "#000000"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFood();

    ctx.fillStyle = "#42f54e";
    snake.forEach((part) => add(part.x, part.y));

    requestAnimationFrame(draw);
}

function saveHighscore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreDisplay.textContent = 'Highscore: ' + highscore;
    }
}

function add(x, y) {
    ctx.fillRect(
        x * cellWidth,
        y * cellHeight,
        cellWidth - 1,
        cellHeight - 1
    );
}

function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);
    food = { x: randomX, y: randomY };
}

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function testGameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    if (snake[0].x < 0 || snake[0].x > cols - 1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart) { 
        placeFood();
        snake = [{ x: 19, y: 3 }];
        direction = 'LEFT';
        saveHighscore();
        score = 0;
        scoreDisplay.textContent = 'Punkte: ' + score;
        isGameRunning = false;
        clearInterval(gameLoopInterval);
    }
}

function startGame() {
    isGameRunning = true;
}

function gameLoop() {
    if (!isPaused) {
        testGameOver();
        if (foodCollected) {
            snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
            score++;
            scoreDisplay.textContent = 'Punkte: ' + score;
            foodCollected = false;
        }
        shiftSnake();

        if (direction == "LEFT") snake[0].x--;
        if (direction == "RIGHT") snake[0].x++;
        if (direction == "UP") snake[0].y--;
        if (direction == "DOWN") snake[0].y++;

        if (snake[0].x == food.x && snake[0].y == food.y) {
            foodCollected = true;
            placeFood();
        }
    }
}

function keyDown(e) {
    if (e.keyCode == 37 || e.keyCode == 65) direction = "LEFT";
    if (e.keyCode == 38 || e.keyCode == 87) direction = "UP";
    if (e.keyCode == 39 || e.keyCode == 68) direction = "RIGHT";
    if (e.keyCode == 40 || e.keyCode == 83) direction = "DOWN";
}
