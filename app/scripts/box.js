/************************************************
PATTERN BLOCK SETTINGS
************************************************/

// BOX ARRAY
let boxes = [];  // array of boxes
let previousBoxValues;

// BOX GLOBAL SETTINGS
const totalStates = 5;  // number of pattern states
const boxRotation = [0, 90, 180, 270]; // rotation values

// BOX COLORS
let bgColor;
let patternColors = [];

// GRID SETTINGS
let xCount, yCount; // current quantity of boxes on x and y axis
let totalXCount, totalYCount; // total quantity of boxes at smallest size

let activeBox = 0;

/************************************************
PATTERN BLOCK SETUP
************************************************/

// INITILIAZE ALL BOXES
function initBoxes() {
  calcGrid();
  setBoxColors();
  createBoxes();
}

// CALCULATE BOX GRID BASED ON WINDOW SIZE AND BOX SIZE SETTING
function calcGrid() {
  // GET BOX SIZE VALUE
  boxSize = document.querySelector('#grid-size').value;

  // CALCULATE TOTAL SIZE
  let minBoxSize = 80;
  totalXCount = Math.ceil(window.innerWidth / minBoxSize);
  totalYCount =  Math.ceil(window.innerHeight / minBoxSize);

  // DETERMINE DISPLAY GRID QUANTITY
  xCount = Math.ceil(window.innerWidth / boxSize);
  yCount = Math.ceil(window.innerHeight / boxSize);
}


// UPDATE BOX GRID WHEN USER CHANGES BOX SIZE
function updateGrid() {

  // RECALCULATE GRID
  calcGrid();

  // UPDATE BOX POSITION AND SIZE
  index = 0;

  for (let i=0; i<totalXCount; i++) {
    for (let j=0; j<totalYCount; j++) {

      // CALC X AND Y POSITIONGS
      let x = (boxSize/2) + (i * boxSize);
      let y = (boxSize/2) + (j * boxSize);

      // UPDATE BOXES
      boxes[index].x = x;
      boxes[index].y = y;
      boxes[index].s = boxSize;

      index++;
    }
  }
}

// UPDATE COLOR SETTINGS
function setBoxColors() {
  // BACKGROUND COLOR
  bgColor = document.querySelector('#bg-color').value;

  // PATTERN COLORS
  patternColors[0] = document.querySelector('#shape-color-01').value;
  patternColors[1] = document.querySelector('#shape-color-02').value;
  patternColors[2] = document.querySelector('#shape-color-03').value;
}

// CREATE BOX OBJECTS
function createBoxes() {

  let index = 0;

  // CREATE BOX OBJECTS
  for (var i = 0; i < totalXCount; i++) {
    for (var j = 0; j < totalYCount; j++) {

      // CALC X AND Y POSITIONGS
      let x = (boxSize/2) + (i * boxSize);
      let y = (boxSize/2) + (j * boxSize);

      // CREATE BOXES
      boxes[index] = new Box(x, y, boxSize, index, i, j);

      // INCREMENT INDEX
      index++;
    }
  }
}

// GENERATE RANDOM BOX ASSORTMENT
function randomizeBoxes() {
  // CLEAR CURRENT ARRAY
  for (let i=0; i<boxes.length; i++) {
    boxes[i].pState = getRndInteger(0, totalStates - 1);
    boxes[i].rState = boxRotation[getRndInteger(0, boxRotation.length - 1)];
    boxes[i].cId = getRndInteger(0, patternColors.length - 1);
  }
}


/************************************************
PATTERN BLOCK OBJECT
************************************************/

// BOX CONSTRUCTOR
function Box(x, y, size, id, xId, yId) {
  this.x = x;  // x pos of background rectangle
  this.y = y;  // y pos of background rectangle
  this.s = size;  // size of box
  this.pState = 0; // indicator for the pattern shape of each box
  this.rState = 0; // rotation value
  this.hover = false; // boolean to indicate if mouse is within box
  this.cId = getRndInteger(0, patternColors.length - 1); // color state
  this.id = id; // index
  this.xId = xId; // x-axis identifier
  this.yId = yId; // y-axis identifier
  this.toggled = false; // inidcates if user has toggled box
}

// DISPLAY THE BOX
Box.prototype.display = function() {
  let h1 = this.s / 2; // half Size
  let h2 = this.s / 4;  // quarter size

  // DRAwing settings
  push();
  translate(this.x, this.y);

  // DRAW BOX BACKGROUND
  fill(bgColor);
  rect(0, 0, this.s, this.s);

  if (this.hover) {
    push();
    colorMode(RGB, 255, 255, 255, 100);
    if (bgColor == "ffffff") {
      fill(0, 0, 0, 20);
    } else {
      fill(255, 255, 255, 30);
    }
    // rect(this.x, this.y, this.s, this.s);
    rect(0, 0, this.s, this.s);
    pop();
  }

  // SET SHAPE COLOR
  fill(patternColors[this.cId]);
  rotate(this.rState);

  // DRAW PATTERNS
  if (this.pState === 1) {
    // draw half arc
    arc(-h1, 0, this.s, this.s, 270, 90, PIE);
  } else if (this.pState === 2) {
    // draw two quarter arcs
    arc(-h1, -h1, this.s, this.s, 0, 90, PIE);
    arc(h1, h1, this.s, this.s, 180, 270, PIE);
  } else if (this.pState === 3) {
    // draw two half arcs
    arc(-h1, 0, this.s, this.s, 270, 90, PIE);
    arc(h1, 0, this.s, this.s, 90, 270, PIE);
  } else if (this.pState === 4) {
    // draw large quarter arc
    arc(-h1, -h1, this.s*2, this.s*2, 0, 90, PIE);
  } else if (this.pState === 5) {
    // inverse ellipse
    rect(0, 0, this.s, this.s);
    fill(bgColor);
    ellipse(0, 0, this.s, this.s);
  }
  pop();
}

// HOVER BEHAVIOR
Box.prototype.hoverCheck = function() {
  let h = this.s / 2;

  // check mouse position
  if (mouseX > this.x - h && mouseX < this.x + h && mouseY > this.y - h && mouseY < this.y + h) {
    this.hover = true;
    activeBox = this.id;
  } else {
    this.hover = false;
  }
}

// CHANGE BOX PATTERN
Box.prototype.flip = function() {
  // CHANGE COLOR
  this.cId = getRndInteger(0, patternColors.length - 1);

  // INCREASE BOX STATE
  if (this.pState == 0) {
    this.rState = boxRotation[getRndInteger(0, boxRotation.length - 1)];
    this.pState = getRndInteger(1, totalStates - 1);
    this.toggled = true;
  } else {
    this.pState++;
    if (this.pState > totalStates) {
      this.pState = 0;
      this.toggled = false;
    }
  }
}

// ROTATE BOX
Box.prototype.spin = function() {
  this.rState+=90;
}
