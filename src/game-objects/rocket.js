import {GameObject} from "./_game-object";
import {camera} from "../camera";
import {scene} from "../scene";
import {GAME_CONFIG} from "../service/config";
import {state} from "../state";
import {getRotatedCoordinates} from "./control";

const degToRad = (a) => a * Math.PI / 180;
const radToDeg = (a) => a * 180 / Math.PI;

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
const impulseLossRatio = 0.85;
const cameraPadding = 750;
const scale = state.scale;

let canvas;
let angle = state.angle;
let y0 = state.y0;
let x0 = state.x0;

let t = 0;

let wall;

export class Rocket extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.image.onload = () => {
      this.imageReady = true;
      //this.width = this.image.width;
      //this.height = this.image.height;
    };
    this.image.src = './images/rocket.png';
    this.isMousePressed = false;
    this.control = scene.find('control');
    this.rotation = -state.angle;

    this.width = 150;
    this.height = 150;

    canvas = this.ctx.canvas;
    wall = scene.find('wall');

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
    const x1 = x0 + state.speed * Math.cos(angleInRads) * t * (1 / scale);
    const y1 = y0 - (state.speed * Math.sin(angleInRads) * t - g * t * t / 2) * (1 / scale);
    this.rotation = radToDeg(Math.atan((y1 - this.y) / (x1 - this.x)));
    console.log('rotation ', this.rotation);
    this.x = x1;
    this.y = y1;
    //const y1 = y0 - (v0 * Math.sin(alpha) * t - g * t * t / 2) * (1 / scale);

    //this.angle = 180 * radians / Math.PI;
    t += delta * scale;

    // console.log(this.x, this.y, this.image.width, this.image.height);

  //  const rocketY = getRotatedCoordinates(this.x + this.width / 2, this.y, this, this.rotation).y;
    const rocketY = this.y;//getRotatedCoordinates(this.x + this.width / 2, this.y, this, this.rotation).y;



    const rocketCenter = {
      x: this.x - this.width / 2,
      y: this.y + this.height / 2
    };

    console.log('y', rocketY);
    const rotatedY = getRotatedCoordinates(this.x, rocketCenter.y, this, this.rotation).y;
    console.log('rotatedY', rotatedY);
    if (this.y- this.height / 2  > y_floor) {
      //debugger;
      y0 = y_floor - this.height / 2;
      x0 = this.x;
      state.speed *= impulseLossRatio;
      t = 0;
    }

  }

  rotate() {
    if (!this.rotation) {
      return;
    }
    // console.log('rotation', this.rotation);
    this.ctx.translate(this.x - camera.x + this.width / 2, this.y);
    this.ctx.rotate(degToRad(this.rotation + 90));
    this.ctx.translate(-this.x + camera.x - this.width / 2, -this.y);
  }

  checkWallCollision() {
    if (this.x >= wall.x && this.y >= GAME_CONFIG.GAME_HEIGHT - wall.height) {
      state.gameSpeed = 0;
      //console.log('kurwa');
    }
  }


  render(delta) {
    if (!this.control) {
      this.control = scene.find('control');
    }

    if (angle !== state.angle) {
      angle = state.angle;
    }


    super.render();


   // this.checkWallCollision();

    if (state.gameSpeed) {
      this.move(delta);
    } else {
      this.rotation = this.rotation? this.rotation : -state.angle;
    }

    //}

    this.rotate();

    if (this.x > this.ctx.canvas.width - cameraPadding) {
      camera.x = this.x - this.ctx.canvas.width + cameraPadding;
    }

    this.ctx.drawImage(this.image, this.x - camera.x, this.y, 150, 150);
    //console.log(this.y);
    // this.ctx.beginPath();
    // this.ctx.arc(this.x - camera.x, this.y, 10, 0, 2 * Math.PI, false);
    // this.ctx.fillStyle = 'green';
    // this.ctx.fill();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
