import {GAME_CONFIG} from "./config";

/**
 * Creates the game state and some of the initial values for the game objects.
 *
 * @type {{canvas: null, isPlaying: boolean, isGameOver: boolean, gameSpeed: number, wallX: number, y0: number, x0: number, angle: number, isFalling: boolean, initialCameraX: number, power: number, cameraX: number}}
 */
const initialState = {
  canvas: null,

  isPlaying: false,
  isFalling: false,
  isGameOver: false,
  gameSpeed: 2,
  /**
   * The angle at which the rocket will be launched.
   */
  angle: 45,
  /**
   * Initial coordinates and power of the rocket (and control vector, with a shift)
   */
  y0: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150,
  x0: 75,
  power: 150,
  /**
   * Position of the wall.
   */
  wallX: 2600,
  /**
   * Camera coordinates.
   */
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
