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
    e.target.setAttribute('value', e.target.value);
    e.target.setAttribute('aria-valuenow', e.target.value);
    document.querySelector('#grid-size-readout').innerHTML = e.target.value;

  }, false);

  // AUTOPLAY TOGGLE
  document.querySelector('.autoplay-toggle').addEventListener('click', function(e){
    e.target.blur();
    let s = e.target.value;
    if (s == "off" && autoPlayIndicator || s == "on" && !autoPlayIndicator) {
      toggleAutoplay();
      updateToggleStatus(e);
    }
  }, false);

  // COLOR CHANGES
  let cc = document.querySelectorAll('.color-selectors');
  for (let i=0; i<cc.length; i++) {
    cc[i].addEventListener('change', function(e){
      setBoxColors();
      e.target.setAttribute('value', e.target.value);
    }, false);
  }

  // SAVE CANVAS
  document.querySelector('#save-btn').addEventListener('click', function(e){
    savePattern();
    e.target.blur();
  }, false);

  // TOGGLE MENU
  document.querySelector('#menu-toggle-btn').addEventListener('click', function(e){
    toggleControlPanel();
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
      toggleControlPanel();
    }

    // ROTATE BLOCKS
    if (e.key.toLowerCase() === 'r') {
      boxes[activeBox].spin();
    }

    // CHANGE COLOR
    if (e.key.toLowerCase() === 'c') {
      boxes[activeBox].changeColor();
    }

    // RANDOMIZE BOXES WITH Q
    if (e.key.toLowerCase() === 'q') {
      randomizeBoxes();
    }

  }, false);
}


/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  let toggleButtons = document.querySelectorAll('.toggle');
  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add( "selected" );
}

// SHOW AND HIDE CONTROL PANEL
function toggleControlPanel() {
  console.log("control panel toggle");

  let cpDiv = document.querySelector('#controls-container');
  let cpToggleDiv = document.querySelector('#control-panel-toggle');
  let toggleBtn = document.querySelector('#menu-toggle-btn');

  if (menuVisible) {
    // HIDE CONTROL PANEL
    cpDiv.classList.remove('cp-visible');
    cpDiv.classList.add('cp-hidden');

    // UPDATE TOGGLE
    cpToggleDiv.classList.remove('cp-toggle-max');
    cpToggleDiv.classList.add('cp-toggle-min');
    toggleBtn.innerHTML = "Menu &rarr;"

    // UPDATE FLAG
    menuVisible = false;
  } else {
    // SHOW MENU
    cpDiv.classList.remove('cp-hidden');
    cpDiv.classList.add('cp-visible');

    // UPDATE TOGGLE
    cpToggleDiv.classList.remove('cp-toggle-min');
    cpToggleDiv.classList.add('cp-toggle-max');
    toggleBtn.innerHTML = "&larr; Hide"

    // UPDATE FLAG
    menuVisible = true;
  }
}
