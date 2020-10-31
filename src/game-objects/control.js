import {GameObject} from "./_game-object";
import {state} from "../services/state";
import {scene} from "../services/scene";
import {GAME_CONFIG} from "../services/config";

/**
 * The class responsible for the work of the arrow that controls the motion vector of the main object of the game.
 *
 * @extends GameObject
 */
export class Control extends GameObject {
  constructor(x, y) {
    super(x, y);

    this.image = new Image();
    this.image.onload = () => this.imageReady = true;
    this.image.src = './images/arrow.png';

    this.rotation = -state.angle;
    this.width = state.power;
    this.height = state.power;

    this.rocket = scene.find('rocket');

    state.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    state.canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
    state.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /**
   * Defines the point around which the element rotates and calls the parent class method.
   *
   * @param {MouseEvent} e Mouse event.
   * @return {boolean} If the mouse cursor is over an element.
   */
  isMouseOverElement(e) {
    const x0 = this.x;
    const y0 = this.y + this.height / 2;
    return super.isMouseOverElement(e, x0, y0);
  }

  /**
   * A method responsible for changing the initial power and angle of flight of the main object of the game.
   *
   * @param {MouseEvent} e Mouse event.
   */
  onMouseMove(e) {
    if (this.isMouseOverElement(e)) {
      state.canvas.style.cursor = 'pointer';
    } else {
      state.canvas.style.cursor = 'default';
    }

    if (this.isMousePressed) {

      /*
       * The block responsible for preventing the motion vector from sending the object down or back.
       */
      let mouseX = this._getMouseCoords(e).x - this.x;
      let mouseY = this._getMouseCoords(e).y - this.y - this.height / 2;

      if (mouseX < 0 || mouseY > 0) {
        return;
      }

      /*
       * Initial flight power is equal to the visible width of the vector and is limited at the bottom and top.
       */
      const controlWidth = Math.abs(Math.sqrt(mouseX * mouseX + mouseY * mouseY));

      if (controlWidth > GAME_CONFIG.MIN_POWER && controlWidth < GAME_CONFIG.MAX_POWER) {
        const power = Math.round(controlWidth);
        this.width = power;
        state.power = power;
      }

      /*
       * The initial flight angle is equal to the tilt angle of the vector.
       */
      const rotation = Math.round(this._radToDeg(Math.atan(mouseY / Math.abs(mouseX))));

      if (rotation < GAME_CONFIG.MAX_ANGLE) {
        this.rotation = GAME_CONFIG.MAX_ANGLE;
      } else if (rotation > GAME_CONFIG.MIN_ANGLE) {
        this.rotation = GAME_CONFIG.MIN_ANGLE;
      } else {
        this.rotation = rotation;
      }

      state.angle = Math.abs(this.rotation);
    }
  }

  /**
   * Determines the point of canvas shift and rotate the vector to the specified angle.
   */
  rotate() {
    if (this.rotation < GAME_CONFIG.MAX_ANGLE) {
      return;
    }
    if (this.rotation > GAME_CONFIG.MIN_ANGLE) {
      return;
    }

    this.ctx.translate(this.x, this.y + this.height / 2);
    this.ctx.rotate(this.rotation ? this._degToRad(this.rotation) : 0);
    this.ctx.translate(-this.x, -this.y - this.height / 2);
  }

  /**
   * Moves the control vector to the point where the main object of the game is located.
   */
  moveToRocket() {
    this.x = this.rocket.x - state.cameraX + 10 + this.height / 2;
    this.y = this.rocket.y - this.height / 2;
  }

  /**
   * Returns the vector width to the value defined in the application state.
   */
  reset() {
    this.width = state.power;
  }

  /**
   * Draws a control vector with a certain angle near the main object of the game.
   */
  render() {
    if (state.isPlaying || state.isGameOver) {
      return;
    }

    this.moveToRocket();
    this.rotate();

    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
