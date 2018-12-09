import * as Konva from 'konva';

// settings
let gameArea = {
  start: function() {
    this.interval = setInterval(updateGameArea, 10);
  },
  stage: new Konva.Stage({
    container: 'container',
    width: 480,
    height: 960
  })
};

function startGame() {
  gameArea.start();
}

let stage = gameArea.stage;
let layer = new Konva.Layer();
let context = layer.getContext('2d')._context;
let container = stage.container();
container.tabIndex = 1;
container.focus();
const DELTA = 5;

let numImages = Math.ceil(stage.getHeight() / 240) + 1;
let bgObj = new Image();
bgObj.src = './assets/gfx/bg-space.png';
bgObj.onload = function() {
  let yPos = 0;
  for (let i = 0; i < numImages; i++) {
    var bg = new Konva.Image({
      x: 0,
      y: yPos,
      image: bgObj,
      width: 480,
      height: 240
    });
    yPos = yPos + 240;
    layer.add(bg);
    bg.moveToBottom();
    panBg(bg);
  };
}

function panBg(bgImg) {
  setInterval(function() {
    bgImg.setAttr('y', bgImg.getAttr('y') + 1);
    if (bgImg.getAttr('y') > stage.getHeight()) {
      bgImg.setAttr('y', -235);
    }
    layer.batchDraw();
  }, 10);
}

// elements
let btns = new Konva.Group();
let btnLeft = new Konva.Circle({
  x: stage.getWidth() / 2 - 150,
  y: stage.getHeight() / 1 - 90,
  radius: 50,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 3,
  className: 'btn',
  direction: 'left'
});
let btnRight = new Konva.Circle({
  x: stage.getWidth() / 2 + 150,
  y: stage.getHeight() / 1 - 90,
  radius: 50,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 3,
  className: 'btn',
  direction: 'right'
});
btns.add(btnLeft, btnRight);

let myPiece = new Konva.Wedge({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 1 - 240,
  radius: 70,
  angle: 60,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 3,
  rotation: -300,
});

// add the shape to the layer
layer.add(btns, myPiece);

// keyboard events
container.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) {
    myPiece.x(myPiece.x() - DELTA);
  } else if (e.keyCode === 38) {
    myPiece.y(myPiece.y() - DELTA);
  } else if (e.keyCode === 39) {
    myPiece.x(myPiece.x() + DELTA);
  } else if (e.keyCode === 40) {
    myPiece.y(myPiece.y() + DELTA);
  } else {
    return;
  }
  e.preventDefault();
  layer.batchDraw();
});

// mouse  events
let holdInterval = null;

stage.on('mousedown touchstart', function(e) {
  let node = e.target;
  let isButton = (node.attrs.className === 'btn');
  if (isButton) {
    holdBtn(node);
  }
});

stage.on('mouseup touchend', function(e) {
  let node = e.target;
  let isButton = (node.attrs.className === 'btn');
  if (isButton) {
    letGoBtn();
  }
});

function holdBtn(node) {
  holdInterval = setInterval(function() {
    let isLeft = (node.attrs.direction === 'left');
    let isRight = (node.attrs.direction === 'right');
    if (isLeft) {
      myPiece.x(myPiece.x() - DELTA);
    }
    if (isRight) {
      myPiece.x(myPiece.x() + DELTA);
    }
    layer.batchDraw();
  }, 20);
};

function letGoBtn() {
  clearInterval(holdInterval);
  holdInterval = null;
}

stage.on('mouseover', function(e) {
  let node = e.target;
  let isButton = (node.attrs.className === 'btn');
  let getDirection = node.attrs.direction;
  if (isButton) {
    document.body.style.cursor = 'pointer';
    node.fill('green');
    layer.batchDraw();
    node.on('mouseout', function() {
      document.body.style.cursor = 'default';
      node.fill('red');
      layer.batchDraw();
      letGoBtn();
    });
  }
});

stage.add(layer);

startGame();
