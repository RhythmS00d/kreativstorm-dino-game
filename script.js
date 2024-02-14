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
};

//Obstacle cactus
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
function drawCactuses() {
  for (const cactus of cactusArray) {
    context.drawImage(
      cactus.img,
      cactus.x,
      cactus.y,
      cactus.width,
      cactus.height
    );
  }
}

// Animation loop
function update() {
  requestAnimationFrame(update);

  // Clear the canvas
  context.clearRect(0, 0, board.width, board.height);

  drawDino();
  drawCactuses();
}

const jumpStatus = {up: false, down: false}

document.addEventListener('keyup', event => {
  event.preventDefault();
  if (event.code === 'Space') {
    if(jumpStatus.up) return
    if(jumpStatus.down) return
    jumpStatus.up = true
    dinoJump()
  }
})

let targetUp = dinoY - 100;

const animateJump = () => {
  let step = 2
  if(jumpStatus.up){
    dino.y = dino.y - step
    if(dino.y === targetUp) {
      jumpStatus.up = false
      jumpStatus.down = true
    }
  } else if(jumpStatus.down) {
    dino.y = dino.y + step
    if(dino.y === dinoY) {
      jumpStatus.up = false
      jumpStatus.down = false
      return
    }
  }
  requestAnimationFrame(animateJump);
};

function dinoJump(){
  requestAnimationFrame(animateJump)
}