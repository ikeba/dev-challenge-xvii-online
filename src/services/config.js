const GAME_CONFIG = {
  GAME_WIDTH: 1000,
  GAME_HEIGHT: 600,
  SCALE: 2,
  BACKGROUND_HEIGHT: 50,
  MIN_POWER: 100,
  MAX_POWER: 300,
  MIN_ANGLE: -1,
  MAX_ANGLE: -89,
  G: 9.81,
  /**
   * The coefficient by which the rocket's flight power will decrease with each impact on the floor.
   */
  IMPULSE_LOSS_RATIO: 0.75,
  /**
   * The minimum distance to the edge of the playing area that the rocket may approach before the camera shift is activated.
   */
  CAMERA_PADDING: 500
};

GAME_CONFIG.WALL_HEIGHT = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - 150;
GAME_CONFIG.WALL_WIDTH = 150;
GAME_CONFIG.HUD_X = GAME_CONFIG.GAME_WIDTH;
GAME_CONFIG.HUD_Y = 0;

export {GAME_CONFIG};
