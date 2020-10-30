import {GameObject} from "./_game-object";
import {camera} from "../services/camera";
import {scene} from "../services/scene";
import {GAME_CONFIG} from "../services/config";
import {state} from "../services/state";

const y_floor = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT;

export class Rocket extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.image.onload = () => {
      this.imageReady = true;
    };
    this.image.src = './images/rocket.png';

    this.x0 = state.x0;
    this.y0 = state.y0;
    this.t = 0;

    this.rotation = -state.angle;

    this.width = 150;
    this.height = 150;

    this.control = scene.find('control');
    this.wall = scene.find('wall');

    state.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  isMouseOverElement(e) {
    const x0 = this.x + this.width / 2;
    const y0 = this.y;
    this.rotation += 90;
    const isMouseOver = super.isMouseOverElement(e, x0, y0);
    this.rotation -= 90;
    return isMouseOver;
  }

  onMouseMove(e) {
    if (this.isMouseOverElement(e)) {
      state.canvas.style.cursor = 'pointer';
    } else {
      state.canvas.style.cursor = 'default';
    }

    if (this.isMousePressed) {
      const h = this._getMouseCoords(e).y - this.height / 2;
      if (h > (GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - this.height / 2) || h < 200) {
        return;
      }
      this.y0 = this._getMouseCoords(e).y - this.height / 2;
      this.y = this.y0;
    }
  }

  reset() {
    this.x0 = this.x;
    this.y0 = this.y;
    this.t = 0;
  }

  move(delta) {
    const rads = this._degToRad(state.angle);
    const x1 = this.x0 + state.power * Math.cos(rads) * this.t * (1 / GAME_CONFIG.SCALE);
    const y1 = this.y0 - (state.power * Math.sin(rads) * this.t - GAME_CONFIG.G * this.t * this.t / 2) * (1 / GAME_CONFIG.SCALE);
    this.rotation = this._radToDeg(Math.atan((y1 - this.y) / (x1 - this.x)));

    this.x = x1;
    this.y = y1;

    this.t += delta * GAME_CONFIG.SCALE;

    if (this.y - this.height / 2 > y_floor) {
      this.y0 = y_floor - this.height / 2;
      this.x0 = this.x;
      this.t = 0;
      state.power *= GAME_CONFIG.IMPULSE_LOSS_RATIO;
    }

  }

  rotate() {
    if (!this.rotation) {
      return;
    }
    this.ctx.translate(this.x - camera.x + this.width / 2, this.y);
    this.ctx.rotate(this._degToRad(this.rotation + 90));
    this.ctx.translate(-this.x + camera.x - this.width / 2, -this.y);
  }

  checkWallCollision() {
    if ((this.x + this.width / 3) >= this.wall.x &&
      (this.x - this.width / 3) <= this.wall.x + this.wall.width &&
      this.y >= GAME_CONFIG.GAME_HEIGHT - this.wall.height) {
      state.gameSpeed = 0;
    }
  }

  render(delta) {
    if (!this.control) {
      this.control = scene.find('control');
    }

    if (this.rotation !== state.angle) {
      this.rotation = -state.angle;
    }

    if (state.isPlaying) {
      this.move(delta);
      camera.move(this.x);
    } else {
      this.rotation = this.rotation ? this.rotation : -state.angle;
    }

    this.checkWallCollision();
    this.rotate();

    this.ctx.drawImage(this.image, this.x - camera.x, this.y, 150, 150);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
