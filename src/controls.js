import {GAME_CONFIG} from "./services/config";
import {scene} from "./services/scene";
import {resetState, state} from "./services/state";

const UI = {
  playPause: document.querySelector('#playPause'),
  playAgain: document.querySelector('#playAgain'),
  speed1: document.querySelector('#speed-1'),
  speed2: document.querySelector('#speed-2'),
  speed3: document.querySelector('#speed-3'),
  speedContainer: document.querySelector('#speedContainer'),
};

UI.playPause.addEventListener('click', () => {
  if (!state.isPlaying) {
    state.isPlaying = true;
    scene.find('rocket').reset();
    scene.find('control').reset();
  } else {
    state.isPlaying = false;
  }
});

function resetControls() {
  [...UI.speedContainer.querySelectorAll('button'), UI.playPause].map((el) => el.disabled = false);
  UI.playAgain.disabled = true;
  UI.speed2.disabled = true;
}

UI.playAgain.addEventListener('click', () => {
  scene.clear();
  resetState();
  scene.initialize();
  resetControls();
});

UI.speedContainer.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  [...UI.speedContainer.querySelectorAll('button')]
    .map((el) => el.disabled = false);

  e.target.disabled = true;
  state.gameSpeed = +e.target.id.split('-')[1];
});

window.addEventListener('gameover', () => {
  [...UI.speedContainer.querySelectorAll('button'), UI.playPause].map((el) => el.disabled = true);
  UI.playAgain.disabled = false;
});
