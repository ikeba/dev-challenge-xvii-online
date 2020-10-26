import {GameObject} from "./_game-object";
import {camera} from "../camera";

const scale = 2;

const g = 9.81;
const alpha = 60 * (Math.PI / 180);
const y_floor = 600;
const impulseLossRatio = 0.75;
const cameraPadding = 750;

let y0 = 600;
let x0 = 0;
let v0 = 150;
let t = 0;


export class Rocket extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.image.onload = () => this.imageReady = true;
    this.image.src = './images/rocket.png';
  }

  move(delta) {
    this.x = x0 + v0 * Math.cos(alpha) * t * (1 / scale);
    this.y = y0 - (v0 * Math.sin(alpha) * t - g * t * t / 2) * (1 / scale);
    //const y1 = y0 - (v0 * Math.sin(alpha) * t - g * t * t / 2) * (1 / scale);
    //let radians = Math.atan2(y1 - this.y, x1 - this.x);
    //this.angle = 180 * radians / Math.PI;
    t += delta * 2;

    // console.log(this.x, this.y, this.image.width, this.image.height);

    if (this.y > y_floor) {
      y0 = y_floor;
      x0 = this.x;
      v0 = v0 * impulseLossRatio;
      t = 0;
    }

  }

  rotate() {
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(Math.PI / 180 * (this.angle + 90));
    this.ctx.translate(-this.x, -this.y);
  }


  render(delta) {
    super.render();
    // if (!this.imageReady) {
    //   return;
    // }
    //if (this.y <= y_floor) {
    this.move(delta);
    //}

    //this.rotate();
    //this.ctx.drawImage(this.image, this.x, this.y, 150, 150);
    if (this.x > this.ctx.canvas.width - cameraPadding) {
      camera.x = this.x - this.ctx.canvas.width + cameraPadding;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x - camera.x, this.y, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
