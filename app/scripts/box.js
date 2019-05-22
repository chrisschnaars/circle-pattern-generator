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
  let index = 0;

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

  // COLOR SELECTOR VARIABLES
  let b = document.querySelector('#bg-color');
  let c1 = document.querySelector('#shape-color-01');
  let c2 = document.querySelector('#shape-color-02');
  let c3 = document.querySelector('#shape-color-03');

  // BACKGROUND COLOR
  bgColor = b.value;

  // PATTERN COLORS
  patternColors[0] = c1.value;
  patternColors[1] = c2.value;
  patternColors[2] = c3.value;

  // UPDATE VALUE
  // b.setAttrbute('value', bgColor);
  // c1.setAttrbute('value', patternColors[0]);
  // c2.setAttrbute('value', patternColors[1]);
  // c3.setAttrbute('value', patternColors[2]);
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

      // GENERATE RANDOM ROTATION AND COLOR
      let r = boxRotation[getRndInteger(0, boxRotation.length - 1)];
      let c = getRndInteger(0, patternColors.length - 1)

      // CREATE BOXES
      boxes[index] = new Box(x, y, boxSize, r, c, index, i, j);

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
function Box(x, y, size, r, c, id, xId, yId) {
  this.x = x;  // x pos of background rectangle
  this.y = y;  // y pos of background rectangle
  this.s = size;  // size of box
  this.pState = 0; // indicator for the pattern shape of each box
  this.rState = r; // rotation value
  this.hover = false; // boolean to indicate if mouse is within box
  this.cId = c; // color state
  this.id = id; // index
  this.xId = xId; // x-axis identifier
  this.yId = yId; // y-axis identifier
  this.toggled = false; // inidcates if user has toggled box
}

// DISPLAY THE BOX
Box.prototype.display = function() {
  push();

  // ORIENT IN CENTER
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

  /**** PATTERNS ****/

  // SIZE VARIABLES
  const h1 = this.s / 2; // half Size
  const h2 = this.s / 4;  // quarter size

  // 01: SINGLE HALF ARC
  if (this.pState === 1) {
    arc(0, -h1, this.s, this.s, 0, 180, PIE);
  }

  // 02: TWO QUARTER ARCS
  else if (this.pState === 2) {
    // draw two quarter arcs
    arc(-h1, -h1, this.s, this.s, 0, 90, PIE);
    arc(h1, h1, this.s, this.s, 180, 270, PIE);
  }

  // 03: TWO OUTWARD-FACING HALF ARCS
  else if (this.pState === 3) {
    arc(0, -h1, this.s, this.s, 0, 180, PIE);
    arc(0, h1, this.s, this.s, 180, 360, PIE);
  }

  // 04: LARGE QUARTER ARCS
  else if (this.pState === 4) {
    arc(-h1, -h1, this.s*2, this.s*2, 0, 90, PIE);
  }

  // RECTANGLE
  else if (this.pState === 5) {
    // inverse ellipse
    rect(h2, 0, this.s/2, this.s);
    arc(0, 0, this.s, this.s, 90, 270, PIE);
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
  // SET TOGGLE IF BOX WAS BLANK
  if (this.pState == 0) {
    this.toggled = true;
  }

  // INCREASE BOX STATE
  this.pState++;

  // LOOP AROUND PATTERN IDS IF NEEDED
  if (this.pState > totalStates) {
    this.pState = 0;
    // UPDATE COLOR & ROTATION
    this.spin();
    this.changeColor();
    // UPDATE TOGGLED FLAG
    this.toggled = false;
  }
}

// ROTATE BOX
Box.prototype.spin = function() {
  // ROTATE
  this.rState+=90;
  // UPDATE TOGGLE STATUS
  if (!this.toggled) {
    this.toggled = true;
  }
}

// CHANGE COLOR
Box.prototype.changeColor = function() {
  // GO TO NEXT COLOR
  this.cId++;
  if (this.cId > patternColors.length-1) {
    this.cId = 0;
  }
  // UPDATE TOGGLE STATUS
  if (!this.toggled) {
    this.toggled = true;
  }
}
