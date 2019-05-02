/************************************************
GLOBAL VARIABLES
************************************************/

// CANVAS SETUP
var canvas;
var cw; // CANVAS WIDTH
var ch; // CANVAS HEIGHT

// BOX SIZING
let boxSize;

// MENU STATE
let menuVisible = true;


/************************************************
INTERACTIONS
************************************************/

// SETUP
window.onload = function() {
  setupInteraction();
};

// CREATE EVENT LISTENERS FOR CONTROLS
function setupInteraction() {
  // GRID SIZE SLIDER
  document.querySelector('#grid-size').addEventListener('input', function(e){
    updateGrid();
    document.querySelector('#grid-size-readout').innerHTML = e.target.value;
  }, false);

  // AUTO-GENE  RATE SLIDER
  document.querySelector('#autoplay-speed').addEventListener('input', function(e){
    // SET DURATION
    autoPlayDuration = maxDuration - e.target.value;
    autoPlayTimer = autoPlayDuration;
    console.log(e.target.value, autoPlayDuration);
    // TOGGLE FLAG
    if (e.target.value > 0) {
      autoPlayIndicator = true;
    } else {
      autoPlayIndicator = false;
    }
  }, false);

  // COLOR CHANGES
  document.querySelector('.color-selectors').addEventListener('change', function(e){
    setBoxColors();
  }, false);

  // SAVE CANVAS
  document.querySelector('#save-btn').addEventListener('click', function(e){
    savePattern();
  }, false);

  // KEYBOARD EVENTS
  document.addEventListener('keydown', function(e) {
    // TABBING
    if (e.key === 'Tab') { // the "I am a keyboard user" key
        console.log('tab key man');
        document.body.classList.add('user-is-tabbing');
        // window.removeEventListener('keydown', handleFirstTab);
    }

    // TOGGLE MENU
    if (e.key === 'Shift' ) {
      let cpDiv = document.querySelector('#controls-container');

      if (menuVisible) {
        cpDiv.classList.remove('cp-visible');
        cpDiv.classList.add('cp-hidden');
        menuVisible = false;
      } else {
        cpDiv.classList.remove('cp-hidden');
        cpDiv.classList.add('cp-visible');
        menuVisible = true;
      }
    }

    // ROTATE BLOCKS
    if (e.key.toLowerCase() === 'r') {
      boxes[activeBox].spin();
    }

    // RANDOMIZE BOXES WITH Q
    if (e.key.toLowerCase() === 'q') {
      randomizeBoxes();
    }

    // SAVE SKETCH WITH S
    if (e.key.toLowerCase() === 's') {
      savePattern();
    }

  }, false);
}

// GET RANDOM NUMBER
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
