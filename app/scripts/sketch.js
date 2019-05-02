/************************************************
CANVAS
************************************************/

// FLAG IF USER HAS TOGGLED AUTO PLAY FEATURE
let autoPlayIndicator = false;
let autoPlayDuration = 0; // how much time elapses between moves
let maxDuration = 110;
let autoPlayTimer;


// CANVAS SETUP
function setup() {
  // create canvas
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas = createCanvas(cw, ch);

  // GLOBAL DRAWING SETTINGS
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);

  // INITIALIZE BOXES
  initBoxes();
}

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
    autoToggle();
  }
}

// AUTOMATICALLY CHANGE THINGS
function autoToggle() {
  // DECREASE TIMER
  autoPlayTimer--;
  console.log(autoPlayTimer);

  // WHEN TIMER IS UP, CHANGE RANDOM BOX
  if (autoPlayTimer <= 0) {
    // SELECT BOX AT RANDOM
    let b;
    do {
      b = getRndInteger(0, boxes.length - 1);
    } while (boxes[b].toggled == true);

    // GENERATE RANDOM
    let p = getRndInteger(0, totalStates - 1);
    let r = boxRotation[getRndInteger(0, boxRotation.length - 1)];
    let c = getRndInteger(0, patternColors.length - 1);

    boxes[b].pState = p;
    boxes[b].rState = r;
    boxes[b].cId = c;

    autoPlayTimer = autoPlayDuration;
  }




  // PICK A CELL AT RANDOM
  // PICK A RANDOM PATTERN STATE, ROTATION, AND COLOR
  // SET THE CELL
  // COUNT DOWN AND DO IT AGAIN
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
