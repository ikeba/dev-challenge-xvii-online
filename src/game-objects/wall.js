import {GameObject} from "./_game-object";
import {state} from "../services/state";
import {GAME_CONFIG} from "../services/config";

/**
 * The class responsible only for drawing the wall.
 * All control is in the Rocket class.
 *
 * @extends GameObject
 */
export class Wall extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.height = GAME_CONFIG.WALL_HEIGHT;
    this.width = GAME_CONFIG.WALL_WIDTH;
    this.image.onload = () => {
      this.imageReady = true;
    };
    this.image.src = './images/wall.png';
  }

  /**
   * Draws the wall.
   */
  render() {
    if (!this.imageReady) {
      return;
    }
    this.ctx.drawImage(this.image, this.x - state.cameraX, this.y, this.width, this.height);
  }
}
