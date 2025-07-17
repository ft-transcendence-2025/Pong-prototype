const canvas = document.querySelector("canvas");
canvas.tabIndex = 0; // Make canvas focusable
canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight / 1.2;

const ctx = canvas.getContext("2d");

// Header
// Change objects atributes
const paddleHeight = canvas.width / 12;
const paddleWidth = window.innerWidth / 100;
let paddleY = canvas.height / 2 - paddleHeight / 2;
const paddleD = 5; // travel velocity
const lineThickness = 2;
const paddleColor = "#333399";
const paddleStrockColor = "#000000";
let leftPaddleX = 5;
let rightPaddleX = canvas.width - paddleWidth - 5;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 8;
const ballColor = "#AA0000";
const ballStrockColor = "000000";
let ballXD = 5; // travel velocity on X axis
let ballYD = 2; // travel velocity on Y axis
const ballLineThickness = 1;

// Check if paddles are moving or stationary
const paddleState = {
    "leftUp": false,
    "leftDown": false,
    "rightUp": false,
    "rightDown": false,
}

let gameState = false; // Press Space to start the game

class Ball {
    constructor(x, y, radius, color, strockColor, xD, yD, lineThickness) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.strockColor = strockColor;
        this.xD = xD;
        this.yD = yD;
        this.lineThickness = lineThickness;
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Full circle
        ctx.fillStyle = this.color;
        ctx.fill();

        // line around the circle
        ctx.strokeStyle = this.strockColor;
        ctx.lineWidth = this.lineThickness;
        ctx.stroke();

        if (gameState === true)
        {
            this.x += this.xD;
            this.y += this.yD;
        }
        else
        {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
        }
    }

    checkPaddleColition(paddle) {
        if (this.x + this.radius >= paddle.x && this.x - this.radius <= paddle.x + paddle.width) // horizontal range
        {
            if (this.y + this.radius >= paddle.y && this.y - this.radius <= paddle.y + paddle.height) // vertical range
                return true;
        }
        return false;
    }

    checkCellingFloorColition() {
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
            return true;
        return false;
    }

    // Check if Someone has scored a point
    updateGameState() {
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width)
            gameState = false;
    }
}

class Paddle {
    constructor(x, y, width, height, yD, lineThickness, color, strockColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.yD = yD;
        this.lineThickness = lineThickness;
        this.color = color;
        this.strockColor = strockColor;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.strockColor;
        ctx.lineWidth = this.lineThickness;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    move(direction) {
        if (direction === "Down" && this.y + this.height + this.lineThickness <= canvas.height)
            this.y += this.yD;
        else if (direction === "Up" && this.y - this.lineThickness >= 0)
            this.y -= this.yD;
    }
}

// Inicialize objects
const leftPaddle = new Paddle(leftPaddleX, paddleY, paddleWidth, paddleHeight, paddleD, lineThickness, paddleColor, paddleStrockColor);
const rightPaddle = new Paddle(rightPaddleX, paddleY, paddleWidth, paddleHeight, paddleD, lineThickness, paddleColor, paddleStrockColor);
const ball = new Ball(ballX, ballY, ballRadius, ballColor, ballStrockColor, ballXD, ballYD, ballLineThickness);

// Run when Window loads
window.addEventListener('load', function() {
    gameLoop();
})

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear full canvas
    
    // Check paddle state and ajust X and Y accordently
    if (paddleState["leftUp"])
        leftPaddle.move("Up");
    if (paddleState["leftDown"])
        leftPaddle.move("Down");
    if (paddleState["rightUp"])
        rightPaddle.move("Up");
    if (paddleState["rightDown"])
        rightPaddle.move("Down");

    // Change ball directions if hit celling, floor or paddles
    if (ball.checkPaddleColition(leftPaddle) || ball.checkPaddleColition(rightPaddle))
        ball.xD *= -1;
    if (ball.checkCellingFloorColition())
        ball.yD *= -1;

    // render the objects
    leftPaddle.render();
    rightPaddle.render();
    ball.render();

    // If someone score a point, update game state
    ball.updateGameState();

    // recursive loop
    requestAnimationFrame(gameLoop);
}


window.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.key === "S")
        paddleState["leftDown"] = true;
    if (event.key === "w" || event.key === "W")
        paddleState["leftUp"] = true;
    if (event.key === "ArrowDown")
        paddleState["rightDown"] = true;
    if (event.key === "ArrowUp")
        paddleState["rightUp"] = true;
    if (event.key == " ")
        gameState = true;
})

window.addEventListener("keyup", function (event) {
    if (event.key === "s" || event.key === "S")
        paddleState["leftDown"] = false;
    if (event.key === "w" || event.key === "W")
        paddleState["leftUp"] = false;
    if (event.key === "ArrowDown")
        paddleState["rightDown"] = false;
    if (event.key === "ArrowUp")
        paddleState["rightUp"] = false;
})
