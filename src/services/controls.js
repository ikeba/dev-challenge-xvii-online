import {scene} from "./scene";
import {resetState, state} from "./state";

/**
 Simplified "controller" for the game, responsible for the control buttons.
 */

/**
 * UI elemetns.
 */
const UI = {
  playPause: document.querySelector('#playPause'),
  playAgain: document.querySelector('#playAgain'),
  speed1: document.querySelector('#speed-1'),
  speed2: document.querySelector('#speed-2'),
  speed3: document.querySelector('#speed-3'),
  speedContainer: document.querySelector('#speedContainer'),
};

UI.playPause.addEventListener('click',
  /**
   * Launches the motion animation, "lifts" the missile coordinates and control vector.
   */
  () => {
    if (!state.isPlaying) {
      state.isPlaying = true;
      if (state.angle !== state.oldAngle || state.power !== state.oldPower) {
        scene.find('rocket').reset();
        scene.find('control').reset();
      }
    } else {
      state.oldAngle = state.angle;
      state.oldPower = state.power;
      state.isPlaying = false;
    }
  });

/**
 * Resets the controls buttons.
 */
function resetControls() {
  [...UI.speedContainer.querySelectorAll('button'), UI.playPause].map((el) => el.disabled = false);
  UI.playAgain.disabled = true;
  UI.speed2.disabled = true;
}

UI.playAgain.addEventListener('click',
  /**
   * Allows to play again.
   * Refreshes the scene, returns the state of the game to its initial value.
   */
  () => {
    scene.clear();
    resetState();
    scene.initialize();
    resetControls();
  });

UI.speedContainer.addEventListener('click',
  /**
   * Allows to change the speed of the game.
   * @param {MouseEvent} e Mouse event.
   */
  (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    [...UI.speedContainer.querySelectorAll('button')]
      .map((el) => el.disabled = false);

    e.target.disabled = true;
    state.gameSpeed = +e.target.id.split('-')[1];
  });

window.addEventListener('gameover',
  /**
   * Turns off the controls when the game is over.
   */
  () => {
    [...UI.speedContainer.querySelectorAll('button'), UI.playPause].map((el) => el.disabled = true);
    UI.playAgain.disabled = false;
  });
