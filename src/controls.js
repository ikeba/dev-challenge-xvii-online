import {GAME_CONFIG} from "./service/config";
import {scene} from "./scene";
import {state} from "./state";

const UI = {
  playPause: document.querySelector('#playPause')
};

UI.playPause.addEventListener('click', () => {
  console.log('clisk');
  if (state.gameSpeed === 0) {
    state.gameSpeed = 2;
    scene.find('rocket').reset();
  } else {
    state.gameSpeed = 0
  }
});
