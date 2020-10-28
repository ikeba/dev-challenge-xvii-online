import {GameObject} from "./_game-object";
import {camera} from "../camera";
import {scene} from "../scene";
import {GAME_CONFIG} from "../service/config";
import {state} from "../state";

const mouse = (e) => {
  const canvasBoundingRectangle = canvas.getBoundingClientRect();
  const mouseX = e.clientX - canvasBoundingRectangle.left;
  const mouseY = e.clientY - canvasBoundingRectangle.top;
  return {
    x: mouseX,
    y: mouseY
  }
};

const g = 9.81;
const y_floor = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT;
const impulseLossRatio = 0.75;
const cameraPadding = 750;
const scale = state.scale;

let canvas;
let angle = state.angle;
let y0 = state.y0;
let x0 = state.x0;

let t = 0;

export class Rocket extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.image.onload = () => this.imageReady = true;
    this.image.src = './images/rocket.png';
    this.isMousePressed = false;
    this.control = scene.find('control');

    this.width = 10;
    this.height = 10;

    canvas = this.ctx.canvas;

    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  isMouseOverElement(e) {

    const mouseX = mouse(e).x;
    const mouseY = mouse(e).y;

   ///  console.log(mouse(e));
    const rad = (this.angle || 0) * 180 / Math.PI;
    const x0 = this.x + this.width / 2;
    const y0 = this.y + this.height / 2;

    const x = x0 + (mouseX - x0) * Math.cos(rad) - (mouseY - y0) * Math.sin(rad);

    const y = y0 + (mouseY - y0) * Math.cos(rad) + (mouseX - x0) * Math.sin(rad);

    // console.log(x, y);

    return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height);
  }

  onMouseDown(e) {
    if (this.isMouseOverElement(e)) {
      this.isMousePressed = true;
      console.log('y rocket');
    }
  }

  onMouseUp() {
    this.isMousePressed = false;
  }

  onMouseMove(e) {
    if (this.isMouseOverElement(e)) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
    // if (this.isMousePressed) {
    //   const h = mouse(e).y - this.height / 2;
    //   if (h > (GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BACKGROUND_HEIGHT - this.height / 2) || h < 200) {
    //     return;
    //   }
    //   y0 = mouse(e).y - this.height / 2;
    //   this.y = y0;
    // }
  }


  reset() {
    x0 = this.x;
    y0 = this.y;
    //v0 = 150;
    t = 0;
  }

  move(delta) {
    let angleInRads = angle * (Math.PI / 180);
    this.x = x0 + state.speed * Math.cos(angleInRads) * t * (1 / scale);
    this.y = y0 - (state.speed * Math.sin(angleInRads) * t - g * t * t / 2) * (1 / scale);
    //const y1 = y0 - (v0 * Math.sin(alpha) * t - g * t * t / 2) * (1 / scale);
    //let radians = Math.atan2(y1 - this.y, x1 - this.x);
    //this.angle = 180 * radians / Math.PI;
    t += delta * scale;

    // console.log(this.x, this.y, this.image.width, this.image.height);

    if (this.y > y_floor) {
      y0 = y_floor;
      x0 = this.x;
      state.speed *= impulseLossRatio;
      t = 0;
    }

  }

  rotate() {
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(Math.PI / 180 * (this.angle + 90));
    this.ctx.translate(-this.x, -this.y);
  }


  render(delta) {
    if (!this.control) {
      this.control = scene.find('control');
    }

    if (angle !== state.angle) {
      angle = state.angle;
    }

    //console.log('ball angle ' + alpha);
    //console.log('control angle ' + this.control.angle);

    super.render();
    // if (!this.imageReady) {
    //   return;
    // }
    //if (this.y <= y_floor) {
    if (state.gameSpeed) {
      this.move(delta);
    }

    //}

    //this.rotate();
    //this.ctx.drawImage(this.image, this.x, this.y, 150, 150);
    if (this.x > this.ctx.canvas.width - cameraPadding) {
      camera.x = this.x - this.ctx.canvas.width + cameraPadding;
    }
    //console.log(this.y);
    this.ctx.beginPath();
    this.ctx.arc(this.x - camera.x, this.y, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
