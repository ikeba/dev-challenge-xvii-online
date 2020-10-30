import {GAME_CONFIG} from "./service/config";

export const state = {
  gameSpeed: 0,
  angle: 45,
  y0: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150,
  x0: 0,
  speed: 150,
  scale: 2,
  wallX: 600,
  wallHeight: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150,
  wallWidth:  150
};
