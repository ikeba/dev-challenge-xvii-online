import {GameObject} from "./_game-object";
import {scene} from "../services/scene";
import {GAME_CONFIG} from "../services/config";
import {state} from "../services/state";

/**
 * The constant that defines a "floor" coordinate.
 * @type {number}
 */
const y_floor = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT;

/**
 * The class responsible for the behavior of the main object of the game, at the moment, is a rocket.
 *
 * @extends GameObject
 */
export class Rocket extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.rocketImageReady = false;
    this.rocketIdleImageReady = false;
    this.rocket = new Image();
    this.rocketIdle = new Image();
    this.rocket.onload = () => {
      this.rocketImageReady = true;
    };
    this.rocketIdle.onload = () => {
      this.rocketIdleImageReady = true;
    };
    this.rocket.src = './images/rocket.png';
    this.rocketIdle.src = './images/rocket_idle.png';

    this.x0 = state.x0;
    this.y0 = state.y0;
    this.t = 0;

    this.rotation = -state.angle;

    this.width = 150;
    this.height = 150;

    this.control = scene.find('control');
    this.wall = scene.find('wall');

    this.maxY = this.center.y;

    state.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /**
   * Returns the coordinates of the rocket center taking into account the rotation and shift.
   *
   * @return {{x: number, y: number}} Coordinates of the rocket center
   */
  get center() {
    const x0 = this.x + this.width / 2;
    const y0 = this.y;

    /*
     * It is necessary to "turn" the rocket before the calculations to match the view, as it will be rendered turned.
     */
    this.rotation += 90;
    const center = this._getRotatedCoordinates(x0, y0, this.x + this.width / 2, this.y + this.height / 2, this.rotation);
    this.rotation -= 90;
    return center;
  }

  /**
   * Checks if the mouse cursor is over an element.
   *
   * @param {MouseEvent} e Mouse event.
   * @param {number=} x0 The X coordinate of the point around which the rotation of the element is performed.
   * @param {number=} y0 the Y coordinate of the point around which the rotation of the element is performed.
   *
   * @return {boolean} If the mouse cursor is over an element.
   */
  isMouseOverElement(e, x0 = this.x + this.width / 2, y0 = this.y) {
    this.rotation += 90;
    const isMouseOver = super.isMouseOverElement(e, x0, y0);
    this.rotation -= 90;
    return isMouseOver;
  }

  /**
   * Allows to change the initial height of the rocket by drag and drop.
   *
   * @param {MouseEvent} e Mouse event.
   */
  onMouseMove(e) {
    if (this.isMouseOverElement(e)) {
      state.canvas.style.cursor = 'pointer';
    } else {
      state.canvas.style.cursor = 'default';
    }

    if (this.isMousePressed && !state.isPlaying) {
      const h = this._getMouseCoords(e).y - this.height / 2;
      if (h > (GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - this.height / 2) || h < 200) {
        return;
      }
      this.y0 = this._getMouseCoords(e).y - this.height / 2;
      this.y = this.y0;
    }
  }

  /**
   * Replaces the current coordinates in the formula for the movement of the body thrown at an angle to the horizon.
   */
  reset() {
    this.x0 = this.x;
    this.y0 = this.y;
    this.t = 0;
  }

  /**
   * Calculates new coordinates for the rocket using a standard physics formula.
   * Calculates the rotation angle based on the old and new coordinates.
   * Calculates the maximum flight altitude during the whole game and the maximum range for the current parabola.
   * Determines whether the rocket has fallen to the floor level and launches again at a reflected angle
   * with a changed force level (loss of kinetic energy)
   *
   * @param {number} delta Value to change the time coordinate.
   */
  move(delta) {
    let rads = this._degToRad(state.angle);

    const x1 = this.x0 + state.power * Math.cos(rads) * this.t * (1 / GAME_CONFIG.SCALE);
    const y1 = this.y0 - (state.power * Math.sin(rads) * this.t - GAME_CONFIG.G * this.t * this.t / 2) * (1 / GAME_CONFIG.SCALE);

    this.rotation = this._radToDeg(Math.atan((y1 - this.y) / (x1 - this.x)));
    this.x = x1;
    this.y = y1;

    if (state.isPlaying) {
      this.t += delta * GAME_CONFIG.SCALE;
    }

    const Lmax = state.power * state.power * Math.sin(2 * rads) / GAME_CONFIG.G;

    if (this.Lmax !== Lmax) {
      this.Lmax = Lmax;
      if (this.Lmax < this.width) {
        this.gameOver();
        return;
      }
    }

    if (this.center.y < this.maxY) {
      this.maxY = this.center.y;
    }

    if (this.center.y + this.height / 3 > y_floor) {
      this.y0 = y_floor - this.height;
      this.x0 = this.x;
      this.t = 0;
      state.power *= GAME_CONFIG.IMPULSE_LOSS_RATIO;
    }

  }

  /**
   * Simple dropping down in a collision with a wall. When falling to the floor stops the animation.
   *
   * @param {number} delta Value to change the time coordinate.
   */
  fall(delta) {
    let rads = this._degToRad(state.angle);
    this.y = this.y0 - (state.power * Math.sin(rads) * this.t - GAME_CONFIG.G * this.t * this.t / 2) * (1 / GAME_CONFIG.SCALE);
    this.t += delta * GAME_CONFIG.SCALE;

    if (this.center.y + this.height / 4 > y_floor) {
      state.gameSpeed = 0;
    }

  }

  /**
   * Determines the point of canvas shift and rotate the rocket to the specified angle.
   */
  rotate() {
    if (!this.rotation) {
      return;
    }
    this.ctx.translate(this.x - state.cameraX + this.width / 2, this.y);
    this.ctx.rotate(this._degToRad(this.rotation + 90));
    this.ctx.translate(-this.x + state.cameraX - this.width / 2, -this.y);
  }

  /**
   * It checks if a collision with a wall has occurred and starts the end of the game procedure, if any.
   */
  checkWallCollision() {
    if ((this.center.x + this.width / 4) >= this.wall.x &&
      ((this.center.x - this.width / 4)) <= this.wall.x + this.wall.width &&
      this.center.y >= GAME_CONFIG.GAME_HEIGHT - this.wall.height) {
      this.gameOver();
    }
  }

  /**
   * Moves the camera if the rocket came close enough to the end of the playing field.
   */
  cameraMove() {
    if (this.x > state.canvas.width - GAME_CONFIG.CAMERA_PADDING) {
      state.cameraX = this.x - state.canvas.width + GAME_CONFIG.CAMERA_PADDING;
    } else {
      state.cameraX = 0;
    }
  }

  /**
   * Finishes the game by changing the values in the application state and sends events to change the state of
   * the control buttons.
   */
  gameOver() {
    state.isPlaying = false;
    state.isFalling = true;
    state.isGameOver = true;
    window.dispatchEvent(new CustomEvent('gameover'));
  }

  /**
   * Renders the rocket.
   *
   * @param {number} delta Value to change the time coordinate.
   */
  render(delta) {
    if (!this.rocketIdleImageReady || !this.rocketImageReady) {
      return;
    }

    if (!this.control) {
      this.control = scene.find('control');
    }

    // if (this.rotation !== state.angle) {
    //   this.rotation = -state.angle;
    // }

    if (state.isPlaying) {
      this.move(delta);
      this.cameraMove();
    } else if (state.isFalling) {
      this.fall(delta);
    } else {
      //this.rotation = this.rotation ? this.rotation : -state.angle;
    }

    this.checkWallCollision();
    this.rotate();

    if (state.isPlaying) {
      this.ctx.drawImage(this.rocket, this.x - state.cameraX, this.y, 150, 150);
    } else {
      this.ctx.drawImage(this.rocketIdle, this.x - state.cameraX, this.y, 150, 150);
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
