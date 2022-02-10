let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 4;
let raquetteH = 15;
let raquetteW = 10;
let raquetteX = (canvas.width-raquetteW)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c=0; c< brickColumnCount; c++){
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0};
    }
} 

function drawBricks(){
    for(let c = 0; c<brickColumnCount; c++){
        for(let r = 0; r< brickRowCount; r++){
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#C5A2B9";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function dessinerBalle(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#004E70";
    ctx.fill();
    ctx.closePath();
}

function dessinerRaquette(){
    ctx.beginPath();
    ctx.rect(raquetteX, canvas.height-raquetteH, raquetteW, raquetteH);
    ctx.fillStyle = "#D0E050";
    ctx.fill();
    ctx.closePath();
}

function dessiner(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerBalle();
    dessinerRaquette();
    drawBricks();

    x += dx;
    y += dy;
    if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > canvas.height-ballRadius) {
        if(x > raquetteX && x < raquetteX + raquetteW) {
            dy = -dy;
        }
        else {
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(rightPressed) {
        raquetteX += 7;
        if (raquetteX + raquetteW > canvas.width){
            raquetteX = canvas.width - raquetteW;
        }
    }
    else if(leftPressed) {
        raquetteX -= 7;
        if (raquetteX < 0){
            raquetteX = 0;
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
            }
        }
    }
}

let interval = setInterval(dessiner, 10);

