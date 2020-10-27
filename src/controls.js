import {GAME_CONFIG} from "./service/config";
import {scene} from "./scene";

const UI = {
  playPause: document.querySelector('#playPause')
};

UI.playPause.addEventListener('click', () => {
  console.log('clisk');
  if (GAME_CONFIG.GAME_SPEED === 0) {
    GAME_CONFIG.GAME_SPEED = 3;
    scene.find('rocket').reset();
  } else {
    GAME_CONFIG.GAME_SPEED = 0
  }
});
