import {scene} from "./services/scene";
import {GAME_CONFIG} from "./services/config";
import './controls';
import {state} from "./services/state";

let canvas;
let context;
let delta = 0;
let oldTimeStamp = 0;

window.onload = init;

/**
 * Initializes initial application container.
 *
 * @return {undefined}
 */
function init() {
  canvas = document.getElementById('game');
  context = canvas.getContext('2d');

  canvas.setAttribute('width', String(GAME_CONFIG.GAME_WIDTH));
  canvas.setAttribute('height', String(GAME_CONFIG.GAME_HEIGHT));

  state.canvas = canvas;
  scene.initialize(context);

  window.requestAnimationFrame(gameLoop);
}

/**
 * Count time to understand real FPS. Calls render function.
 *
 * @param timeStamp
 * @return {undefined}
 */
function gameLoop(timeStamp) {
  delta = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  render(delta);
  requestAnimationFrame(gameLoop);
}

/**
 * Goes through the scene, clears canvas and renders each gameObject with predefined speed.
 *
 * @param delta
 * @return {undefined}
 */
function render(delta) {
  if (!context) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  scene.render(delta * state.gameSpeed);
}

requestAnimationFrame(gameLoop);
