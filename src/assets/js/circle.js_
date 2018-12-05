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
    this.setup();
  }

  setup() {
    // create shape
    const circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
    this.addChild(circle, txt);

    // create text
    const txt = new createjs.Text(this.text, "20px Arial", "white");
    this.addChild(txt);

    // center text
    txt.x = txt.getMeasuredWidth() / 2 * -1;
    txt.y = txt.getMeasuredWidth() / 2 * -1;

    // FadeIn all
    this.alpha = 0;
    createjs.Tween.get(this).to({
      alpha: 1
    }, 1000).call(this.handleComplete);
  }

  handleComplete() {
    this.dispatchEvent('animationEnd');
  }

}

export default createjs.promote(CircleButton, "Container");
