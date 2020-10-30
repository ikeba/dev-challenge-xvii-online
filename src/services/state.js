import {GAME_CONFIG} from "./config";

export const state = {
  canvas: null,
  isPlaying: false,
  gameSpeed: 2,
  angle: 1,
  y0: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150,
  x0: 75,
  power: 150,
  wallX: 1600
};
