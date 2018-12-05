let myCircle = document.getElementById('myCircle');
let myPoly = document.getElementById('myCanvas');
let box1 = $('#box1');
let box2 = $('#box2');

window.addEventListener("keydown", moveSomething, false);

function moveSomething(e) {
  switch (e.keyCode) {
    case 37:
      // left key pressed
      box1.animate({
        left: "-=5"
      }, 1);
      checkCollisions(box1, box2);
      // $('.box').each(function() {
      //   redraw.call(this);
      // });
      break;

    case 39:
      // right key pressed
      box1.animate({
        left: "+=5"
      }, 1);
      checkCollisions(box1, box2);
      // $('.box').each(function() {
      //   redraw.call(this);
      // });
      break;
  }
}



// function redraw(event, ui) {
//   $(this).html(
//       'x : ' + $(this).offset().left + '<br>' +
//       'y : ' + $(this).offset().top + '<br>' +
//       'height: ' + $(this).outerHeight() + '<br>' +
//       'width : ' + $(this).outerWidth())
//     .data('coordinates', {
//       x: $(this).offset().left,
//       y: $(this).offset().top,
//       height: $(this).outerHeight(),
//       width: $(this).outerWidth()
//     });
//   var a = $('#box1').data('coordinates');
//   var b = $('#box2').data('coordinates');
//   if (!(a && b)) {
//     return false;
//   }
//   $('.result').text('!' + !isCollide(a, b));
// }
//
// function isCollide(a, b) {
//   return !(
//     ((a.y + a.height) < (b.y)) ||
//     (a.y > (b.y + b.height)) ||
//     ((a.x + a.width) < b.x) ||
//     (a.x > (b.x + b.width))
//   );
// }


function getPositions(el) {
  var el = $(el);
  var pos = el.position();
  var width = el.width();
  var height = el.height();
  return [
    [pos.left, pos.left + width],
    [pos.top, pos.top + height]
  ];
}

function comparePositions(p1, p2) {
  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

function checkCollisions(el01, el02) {
  var box = $(".bomb")[0];
  var pos1 = getPositions(el01);
  var pos2 = getPositions(el02);
  var horizontalMatch = comparePositions(pos1[0], pos2[0]);
  var verticalMatch = comparePositions(pos1[1], pos2[1]);
  var match = horizontalMatch && verticalMatch;
  if (match) {
    console.log('boom');
  }
}
