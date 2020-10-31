import {GAME_CONFIG} from "./config";

const initialState = {
  canvas: null,
  isPlaying: false,
  isFalling: false,
  isGameOver: false,
  gameSpeed: 2,
  angle: 45,
  y0: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150,
  x0: 75,
  power: 150,
  wallX: 2600,
  initialCameraX: GAME_CONFIG.CAMERA_PADDING,
  cameraX: 0
};

export const resetState = () => {
  Object.assign(state, {
    ...initialState,
    canvas: state.canvas
  });
};

export const state = {...initialState};
