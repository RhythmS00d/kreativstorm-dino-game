//Board canvas
let board;
let boardWidth = 800;
let boardHeight = 300;
let context;

//Dino
let dinoWidth = 90;
let dinoHeight = 95;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

// const dinoY = (offset = 0) => boardHeight - dinoHeight - offset;

const dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight,
  speed: 0,
  gravity: 0.45
};

//Obstacle cactus
let cactus;
let cactusArray = [];

let cactus1Width = 35;
let cactus2Width = 70;
let cactus3Width = 100;

let cactusHeight = 70;
let cactusX = 750;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//Display board, dino and cactus
window.onload = function () {
  board = document.getElementById('board');
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext('2d');

  initDino();
  initCactuses();
  requestAnimationFrame(update);
};

function initDino() {
  dinoImg = new Image();
  dinoImg.src = './images/dino.png';
  // Draw Dino once the image is loaded
  dinoImg.onload = function () {
    drawDino();
  };
}

// Draw Dino on the canvas
function drawDino() {
  dino.speed += dino.gravity
  dino.y = Math.min(dino.y + dino.speed, dinoY);
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
}

function initCactuses() {
  cactus1Img = new Image();
  cactus1Img.src = './images/cactus1.png';
  // Push the cactus1 in the array
  cactusArray.push({
    x: cactusX,
    y: cactusY,
    width: cactus1Width,
    height: cactusHeight,
    img: cactus1Img,
  });

  cactus2Img = new Image();
  cactus2Img.src = './images/cactus2.png';
  // Push the cactus2 in the array
  cactusArray.push({
    x: cactusX,
    y: cactusY,
    width: cactus2Width,
    height: cactusHeight,
    img: cactus2Img,
  });

  cactus3Img = new Image();
  cactus3Img.src = './images/cactus3.png';
  // Push the cactus3 in the array
  cactusArray.push({
    x: cactusX,
    y: cactusY,
    width: cactus3Width,
    height: cactusHeight,
    img: cactus3Img,
  });
}

// Draw all cactuses on the canvas
function drawCactus() {
  cactus.x += -5;

  context.drawImage(
    cactus.img,
    cactus.x,
    cactus.y,
    cactus.width,
    cactus.height)
}

// Animation loop
function update() {
  requestAnimationFrame(update);

  // Clear the canvas
  context.clearRect(0, 0, board.width, board.height);

  drawDino();
  cactusPicker()
  drawCactus();
}

document.addEventListener('keyup', dinoJump)

function dinoJump(event){
  if(event.code === 'Space'){
    if(dino.y === dinoY) {
      dino.speed = -11;
    }
  }
}

function cactusPicker(){
  if(cactus){
    if(cactus.x < 0 - cactus.width){
      cactus.x = cactusX
    } else {
      return
    }
  }
  let random = Math.floor(Math.random() * cactusArray.length)

  cactus = cactusArray[random]
}