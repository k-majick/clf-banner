import createjs from 'createjs';
import CircleButton from './circle';
import bg from '../gfx/bg.jpg';

// Init stage
window.onload = init;

function init() {
  // set stage
  const stage = new createjs.Stage("myCanvas");
  stage.mouseMoveOutside = true;

  // bg
  let bgx = new Image();
  bgx.src = bg;
  bgx.onload = drawBg;

  function drawBg() {
    let shape = new createjs.Shape();
    stage.addChild(shape);
    stage.setChildIndex(shape, 0);
    shape.graphics.clear()
      .beginBitmapFill(bgx); //, "repeat", matrix)
    let fill = shape.graphics.drawRect(0, 0, 300, 300).command;
  }

  // img scaled
  let img = new Image();
  img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";
  img.onload = handleImageLoad;

  function handleImageLoad(e) {
    let img = e.target;
    let bmp = new createjs.Bitmap(img);
    bmp.cache(0, 0, img.width, img.height, 0.3);
    let bmp2 = new createjs.Bitmap(bmp.cacheCanvas);
    bmp.uncache();
    stage.addChild(bmp2);
    stage.update();
  }

  // btn black
  const btn = new CircleButton('Hi');
  btn.x = 50;
  btn.y = 50;
  stage.addChild(btn);

  // btn purple
  const btn2 = new CircleButton('hello', 'purple', 75);
  btn2.x = 100;
  btn2.y = 100;
  btn2.children[1].y = -9;
  console.log(btn2);
  stage.addChild(btn2);
  btn2.addEventListener('animationEnd', function() {
    console.log('fadeIn animation completed')
  });

  // dragger
  let dragger = new createjs.Container();
  dragger.x = dragger.y = 100;
  dragger.addChild(btn);
  stage.addChild(dragger);

  dragger.on("mousedown", function(e) {
    var posX = e.stageX;
    var posY = e.stageY;
    this.offset = {
      x: this.x - posX,
      y: this.y - posY
    };
  });

  dragger.on("pressmove", function(e) {
    e.currentTarget.x = e.stageX + this.offset.x;
    e.currentTarget.y = e.stageY + this.offset.y;
    stage.update();
  });

  stage.setChildIndex(btn2, 1);

  // ticker
  createjs.Ticker.addEventListener("tick", stage);

}
