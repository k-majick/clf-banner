// import moveKeys from './keyboard.js';

let myGamePiece, btnLeft, btnRight;
let elements = [];


function startGame() {
  myGameArea.start();
  myGamePiece = new Component(30, 30, "red", myGameArea.canvas.width / 2 - 15, 720);
  btnLeft = new Circle(120, 800, 60, 0, 2*Math.PI);
  btnRight = new Circle(myGameArea.canvas.width - 120, 800, 60, 0, 2*Math.PI);
  elements.push(myGamePiece, btnLeft, btnRight);
  console.log(elements, btnLeft);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 960;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function Component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    let ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function Circle(xPos, yPos, rad, sAng, eAng, color, stroke) {
  this.x = xPos;
  this.y = yPos;
  this.rad = rad;
  this.sAng = sAng;
  this.eAng = eAng;
  this.update = function() {
    let ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.rad, this.sAng, this.eAng);
    ctx.stroke();
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
  btnRight.update();
  btnLeft.update();
}

// Click detection
myGameArea.canvas.addEventListener('click', function(event) {
  let x = event.pageX - myGameArea.canvas.offsetLeft;
  let y = event.pageY - myGameArea.canvas.offsetTop;
  console.log(x, y)
  elements.forEach(function(element) {
    console.log(element);
    if (y > element.y && y < element.y + element.height &&
      x > element.x && x < element.x + element.width) {
      alert('clicked an element');
    }
  });
}, false);

// Move keys
window.addEventListener("keydown", moveKeys, false);
function moveKeys(e) {
  switch (e.keyCode) {
    case 37:
      // left key pressed
      myGamePiece.x -= 10;
      break;

    case 39:
      // right key pressed
      myGamePiece.x += 10;
      break;
  }
}


startGame();
