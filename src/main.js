import {Scene} from "./scene";
import {GAME_CONFIG} from "./service/config";
import './controls';

let canvas;
let context;
let delta = 0;
let oldTimeStamp = 0;

let scene;

window.onload = init;

function init() {
  canvas = document.getElementById('game');
  context = canvas.getContext('2d');

  scene = new Scene();
  scene.initialize(context);

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
  delta = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  render(delta);
  requestAnimationFrame(gameLoop);
}

function render(delta) {
  if (!context) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  scene.render(delta * GAME_CONFIG.GAME_SPEED);
}

requestAnimationFrame(gameLoop);
