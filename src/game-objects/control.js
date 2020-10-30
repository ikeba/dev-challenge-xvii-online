import {GameObject} from "./_game-object";
import {camera} from "../services/camera";
import {state} from "../services/state";
import {scene} from "../services/scene";
import {GAME_CONFIG} from "../services/config";

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

  isMouseOverElement(e) {
    const x0 = this.x;
    const y0 = this.y + this.height / 2;
    return super.isMouseOverElement(e, x0, y0);
  }

  onMouseMove(e) {
    if (this.isMouseOverElement(e)) {
      state.canvas.style.cursor = 'pointer';
    } else {
      state.canvas.style.cursor = 'default';
    }

    if (this.isMousePressed) {

      let mouseX = this._getMouseCoords(e).x - this.x;
      let mouseY = this._getMouseCoords(e).y - this.y - this.height / 2;

      console.log(this.y, mouseY);
      if (mouseX < 0 || mouseY > 0) {
        return;
      }

      // if ((mouseX <= this.x - camera.x - this.width / 2 + 10) || (mouseY > this.y + this.height)) {
      //     return;
      // }
      const rotation = Math.round(this._radToDeg(Math.atan(mouseY / Math.abs(mouseX))));
      console.log(rotation);

      const controlWidth = Math.abs(Math.sqrt(mouseX * mouseX + mouseY * mouseY));

      if (controlWidth > GAME_CONFIG.MIN_POWER && controlWidth < GAME_CONFIG.MAX_POWER) {
        const power = Math.round(controlWidth);
        this.width = power;
        state.power = power;
      }


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

  moveToRocket() {
    this.x = this.rocket.x - camera.x + 10 + this.height / 2;
    this.y = this.rocket.y - this.height / 2;
  }

  reset() {
    this.width = state.power;
  }

  render() {
    if (state.isPlaying) {
      return;
    }

    this.moveToRocket();
    this.rotate();

    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
