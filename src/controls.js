import {GAME_CONFIG} from "./services/config";
import {scene} from "./services/scene";
import {state} from "./services/state";

const UI = {
  playPause: document.querySelector('#playPause'),
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

UI.speedContainer.addEventListener('click', (e) => {
  [...UI.speedContainer.querySelectorAll('button')]
    .map((el) => el.disabled = false);
  e.target.disabled = true;
  state.gameSpeed = +e.target.id.split('-')[1];
});
