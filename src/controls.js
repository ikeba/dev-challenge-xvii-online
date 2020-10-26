import {GAME_CONFIG} from "./service/config";

const UI = {
  playPause: document.querySelector('#playPause')
};

UI.playPause.addEventListener('click', () => {
  console.log('clisk');
  if (GAME_CONFIG.GAME_SPEED === 0) {
    GAME_CONFIG.GAME_SPEED = 3;
  } else {
    GAME_CONFIG.GAME_SPEED = 0
  }
});
