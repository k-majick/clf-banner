import * as Konva from 'konva';

var width = 480;
var height = 960;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var layer = new Konva.Layer();

var circle = new Konva.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 3
});

circle.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
  this.fill('green');
  layer.draw();
});

circle.on('mouseout', function() {
  document.body.style.cursor = 'default';
  this.fill('red');
  layer.draw();
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);
