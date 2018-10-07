import createjs from 'createjs';
import CircleButton from './circle';
import skySrc from '../gfx/sky.svg';

// Init stage
window.onload = init;
var stage, loader, w, h;
var sky, grass;

function init() {

  // set stage
  stage = new createjs.Stage("myCanvas");
  stage.mouseMoveOutside = true;
  w = stage.canvas.width;
  h = stage.canvas.height;

  // manifest
  var manifest = [{
    src: "grass.svg",
    id: "grass"
  }, {
    src: "sky.svg",
    id: "sky"
  }];

  // loader
  loader = new createjs.LoadQueue(true, "../assets/gfx/");
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true);

}

function handleComplete() {

  let grassObj = loader.getResult("grass");
  let svg = new XMLSerializer().serializeToString(grassObj);
  let base64 = window.btoa(svg);
  let grassSrc = 'data:image/svg+xml;base64,' + base64;

  // grass
  grass = new Image();
  grass.src = skySrc;
  console.log(grassSrc);
  grass.onload = drawGrass;

  function drawGrass() {
    let shape = new createjs.Shape();
    stage.addChild(shape);
    stage.setChildIndex(shape, 1);
    shape.graphics.clear()
      .beginBitmapFill(grass, 'repeat');
    let fill = shape.graphics.drawRect(0, 0, 300, 300).command;
  }

  // sky
  sky = new Image();
  sky.src = skySrc;
  console.log(skySrc);
  // sky.onload = drawSky;

  function drawSky() {
    let shape = new createjs.Shape();
    stage.addChild(shape);
    stage.setChildIndex(shape, 1);
    shape.graphics.clear()
      .beginBitmapFill(sky, 'repeat');
    let fill = shape.graphics.drawRect(0, 0, w, h).command;
  }

  // set ticker
  createjs.Ticker.setFPS(24);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);

}


/*

sky = new createjs.Shape();
sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);
sky.cache(0, 0, w, h);

  // grass
  let grs = new Image();
  grs.src = grsSrc;
  grs.onload = drawGrass;

  function drawGrass() {
    let shape = new createjs.Shape();
    stage.addChild(shape);
    stage.setChildIndex(shape, 1);
    shape.graphics.clear()
      .beginBitmapFill(grs, 'repeat');
    let fill = shape.graphics.drawRect(0, 0, 300, 80).command;
    shape.regY = -220;
    shape.addEventListener("tick", function() {
      shape.x += 5;
    });
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

}*/
