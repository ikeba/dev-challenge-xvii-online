import {GameObject} from "./_game-object";
import {GAME_CONFIG} from "../services/config";
import {state} from "../services/state";
import {scene} from "../services/scene";

/**
 * The class responsible for drawing the service information about the game process.
 */
export class Gui extends GameObject {
  constructor(x, y) {
    super(x, y);

    this.width = 200;
    this.height = 175;

    this.image = new Image();
    this.image.onload = () => {
      this.imageReady = true;
    };
    this.image.src = './images/gui.png';

    this.lineHeight = 30;
    this.color = 'white';
    this.keyFont = '15px Arial';
    this.valueFont = '22px Arial';

    this.keyPadding = 80;
    this.valuePadding = 10;

    this.rocket = null;
  }

  /**
   * Draws the parameter name on certain line.
   *
   * @param {string} text Parameter name.
   * @param {number} line Line.
   */
  drawKey(text, line) {
    this.ctx.font = this.keyFont;
    this.ctx.fillText(text, this.x - this.keyPadding, this.y + line * this.lineHeight);
  }

  /**
   * Draws the parameter value on certain line.
   *
   * @param {string} text Parameter value.
   * @param {number} line Line.
   */
  drawValue(text, line) {
    this.ctx.font = this.valueFont;
    this.ctx.fillText(text, this.x - this.valuePadding, this.y + line * this.lineHeight);
  }

  /**
   * Defines the main object of the game, draws service information.
   */
  render() {
    if (!this.rocket) {
      this.rocket = scene.find('rocket');
    }

    if (!this.imageReady) {
      return;
    }

    this.ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);

    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "right";

    this.drawKey('Current distance', 1);
    this.drawValue(Math.round(this.rocket.x), 1);

    this.drawKey('Current altitude', 2);
    this.drawValue(Math.round(GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - this.rocket.center.y), 2);

    this.drawKey('Max altitude', 3);
    this.drawValue(Math.round(GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - this.rocket.maxY), 3);

    this.drawKey('Angle', 4);
    this.drawValue(Math.round(state.angle), 4);

    this.drawKey('Power', 5);
    this.drawValue(Math.round(state.power), 5);
  }
}
