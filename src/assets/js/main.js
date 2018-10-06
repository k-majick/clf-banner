const createjs = require('createjs');

// Init stage
const stage = new createjs.Stage("myCanvas");

class CircleButton extends createjs.Container {
  constructor(
    text = '',
    color = '#222',
    radius = 40
  ) {
    super();

    this.text = text;
    this.radius = radius;
    this.color = color;

    this.setUp();
  }

  setup() {
    const circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
    this.addChild(circle, txt);

    const txt = new createjs.Text(this.text, "20px Arial", "white");
    this.addChild(txt);


  }
}


function init() {
  console.log("init");
}
window.onload = init;


/*
function init() {
  let stage = new createjs.Stage("demoCanvas");
  let circle = new createjs.Shape();

  createjs.Touch.enable(stage);

  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  circle.x = 50;
  circle.y = 50;

  stage.addChild(circle);
  stage.mouseMoveOutside = true;

  let dragger = new createjs.Container();

  dragger.x = dragger.y = 100;
  dragger.addChild(circle);
  stage.addChild(dragger);

  circle.addEventListener("click", handleClick);

  function handleClick(e) {
    console.log(e.currentTarget.id);
    console.log(e.target.id);
  }

  let img = new Image();
  img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";
  img.onload = handleImageLoad;

  function handleImageLoad(e) {
    let img = e.target;
    let bmp = new createjs.Bitmap(img);
    stage.addChild(bmp);
    stage.update();
  }

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

  stage.update();

}

*/
