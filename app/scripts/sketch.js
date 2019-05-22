/************************************************
CANVAS
************************************************/

// CANVAS SETUP
function setup() {
  // create canvas
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas = createCanvas(cw, ch);
  canvas.parent('pattern-container');

  // GLOBAL DRAWING SETTINGS
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);

  // INITIALIZE BOXES
  initBoxes();
}

// PRIMARY TOUCH EVENT
// function touchStarted() {
//   boxes[activeBox].flip();
//   return false;
// }

// PRIMARY MOUSE EVENT
function mouseClicked() {
  boxes[activeBox].flip();
}

function draw() {
  // check if box is being hovered over
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].xId <= xCount && boxes[i].yId <= yCount) {
      boxes[i].display();
      boxes[i].hoverCheck();
    }
  }

  // FEATURE TO
  if (autoPlayIndicator) {
    autoPlay();
  }
}

// Method to resize canvas
function windowResized() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas = createCanvas(cw, ch);
  initBoxes();
}

// SAVE CANVAS AS IMAGE
function savePattern() {
  saveCanvas(canvas, 'my_wonderful_pattern', 'jpg');
}
