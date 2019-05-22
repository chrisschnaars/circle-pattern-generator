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

// SETUP
window.onload = function() {
  setupInteraction();
};

// GET RANDOM NUMBER
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
