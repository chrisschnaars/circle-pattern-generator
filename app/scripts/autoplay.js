/************************************************
AUTOPLAY
************************************************/

// FLAG IF USER HAS TOGGLED AUTO PLAY FEATURE
let autoPlayIndicator = true;
let autoPlayDuration = 50; // how much time elapses between moves
let autoPlayTimer = autoPlayDuration;

// TOGGLE AUTOPLAY STATUS ON USER INPUT
function toggleAutoplay() {
  if (autoPlayIndicator) {
    autoPlayIndicator = false;
  } else {
    autoPlayIndicator = true;
  }
}

// AUTOMATICALLY CHANGE THINGS
function autoPlay() {
  // DECREASE TIMER
  autoPlayTimer--;

  // WHEN TIMER IS UP, CHANGE RANDOM BOX
  if (autoPlayTimer <= 0) {
    // SELECT BOX AT RANDOM
    let b;
    do {
      b = getRndInteger(0, boxes.length - 1);
    } while (boxes[b].toggled == true && boxes[b].xId > xCount && boxes[b].yId > yCount);

    // GENERATE RANDOM
    let p = getRndInteger(0, totalStates - 1);
    let r = boxRotation[getRndInteger(0, boxRotation.length - 1)];
    let c = getRndInteger(0, patternColors.length - 1);

    // UPDATE BOX PROPERTIES
    boxes[b].pState = p;
    boxes[b].rState = r;
    boxes[b].cId = c;

    // RESET AUTOPLAY TIMER
    autoPlayTimer = autoPlayDuration;
  }
}
