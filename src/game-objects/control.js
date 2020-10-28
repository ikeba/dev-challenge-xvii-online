import {GameObject} from "./_game-object";
import {camera} from "../camera";
import {state} from "../state";
import {scene} from "../scene";

let canvas;

const mouse = (e) => {
  const canvasBoundingRectangle = canvas.getBoundingClientRect();
  const mouseX = e.clientX - canvasBoundingRectangle.left;
  const mouseY = e.clientY - canvasBoundingRectangle.top;
  return {
    x: mouseX,
    y: mouseY
  }
};

const getRotatedCoordinates = (x, y, el) => {
  const x0 = el.x;
  const y0 = el.y + el.height / 2;

  console.log('x0, y0', x0, y0);
  console.log('angle', el.angle);
  const rad = (Math.round(el.angle) * ( Math.PI / 180));
  return {
    x: Math.round(x0 + (x - x0) * Math.cos(rad) - (y - y0) * Math.sin(rad)),
    y: Math.round(y0 + (y - y0) * Math.cos(rad) + (x - x0) * Math.sin(rad))
  };
};


export class Control extends GameObject {
  constructor(x, y) {
    super(x, y);
    canvas = this.ctx.canvas;

    this.image = new Image();
    this.image.onload = () => this.imageReady = true;
    this.image.src = './images/arrow.png';
    this.angle = -state.angle;

    this.width = state.speed;
    this.height = state.speed;

    this.isMousePressed = false;

    this.rocket = scene.find('rocket');

    this.ctx.canvas.onmousedown = this.onMouseDown.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
    window.onmousemove = this.onMouseMove.bind(this);
  }

  isMouseOverElement(e) {

    const mouseX = mouse(e).x;
    const mouseY = mouse(e).y;

    const topLeft = getRotatedCoordinates(this.x, this.y, this);
    const topRight = getRotatedCoordinates(this.x + this.width, this.y, this);
    const bottomLeft = getRotatedCoordinates(this.x, this.y + this.height, this);
    const bottomRight = getRotatedCoordinates(this.x + this.width, this.y + this.height, this);

    console.log('mouse', mouse(e));
    console.log('originTopLeft', this.x, this.y);
    console.log('originTopLeft', this.x, this.y);
    console.log('originBottomLeft', this.x, this.y + this.height);
    console.log('originBottomRight', this.x + this.width, this.y + this.height);
    console.log('originTopRight', this.x + this.width, this.y);
    console.log('topLeft', topLeft);
    console.log('bottomLeft', bottomLeft);
    console.log('bottomRight', bottomRight);
    console.log('topRight', topRight);
    console.log('___');

    const k1 = (topLeft.x - mouseX) * (bottomLeft.y - topLeft.y) - (bottomLeft.x - topLeft.x) * (topLeft.y - mouseY);
    const m1 = (bottomLeft.x - mouseX) * (topRight.y - bottomLeft.y) - (topRight.x - bottomLeft.x) * (bottomLeft.y - mouseY);
    const n1 = (topRight.x - mouseX) * (topLeft.y - topRight.y) - (topLeft.x - topRight.x) * (topRight.y - mouseY);

    const k2 = (bottomRight.x - mouseX) * (bottomLeft.y - bottomRight.y) - (bottomLeft.x - bottomRight.x) * (bottomRight.y - mouseY);
    const m2 = (bottomLeft.x - mouseX) * (topRight.y - bottomLeft.y) - (topRight.x - bottomLeft.x) * (bottomLeft.y - mouseY);
    const n2 = (topRight.x - mouseX) * (bottomRight.y - topRight.y) - (bottomRight.x - topRight.x) * (topRight.y - mouseY);

    return ((k1 <= 0 && m1 <= 0 && n1 <= 0) || (k1 >= 0 && m1 >= 0 && n1 >= 0)) ||
      ((k2 <= 0 && m2 <= 0 && n2 <= 0) || (k2 >= 0 && m2 >= 0 && n2 >= 0));


    //return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height);
  }

  onMouseDown(e) {
    if (this.isMouseOverElement(e)) {
      this.isMousePressed = true;
      console.log('y');
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
    if (this.isMousePressed) {

      let mouseX = mouse(e).x - this.x;
      let mouseY = mouse(e).y - this.y - this.height / 2;

      // console.log('x0 ', x0);
      // console.log('y0 ', y0);
      // console.log('mouseX ', mouseX);
      // console.log('mouseY ', mouseY);

      if (mouseX < this.x - this.width / 2 || mouseY > this.y + this.height) {
          return;
      }

      const l = Math.abs(Math.sqrt(mouseX * mouseX + mouseY * mouseY));
      if (l > 100 && l < 300) {
        const speed = Math.round(l);
        this.width = speed;
        state.speed = speed;
        console.log('state speed', state.speed);
      }


      //this.angle = Math.atan2(mouse(e).y - (this.y + this.height / 2), (this.x + this.width / 2) + mouse(e).x) / Math.PI * 180;
      //const angle = (x0 * mouseX + y0 * mouseY) / (Math.sqrt(x0 * x0 + y0 * y0) * Math.sqrt(mouseX * mouseX + mouseY * mouseY));
      //console.log('angle= ', Math.acos(angle) * 180 / Math.PI);
      console.log('angle= ', Math.atan(mouseY / mouseX) * 180 / Math.PI);
      this.angle = Math.atan(mouseY / mouseX) * 180 / Math.PI;
      state.angle = Math.abs(this.angle);
      //console.log(mouse(e), this.angle);
    }
  }

  rotate() {
    //console.log('rotatatata', this.angle);
    if (this.angle < -89) {
      return;
    }
    if (this.angle > 0) {
      return;
    }

    this.ctx.translate(this.x, this.y + this.height / 2);

    this.ctx.rotate(this.angle ? (this.angle) * (Math.PI / 180) : 0);

    this.ctx.translate(-this.x, -this.y - this.height / 2);

    //console.log('angle= ', this.angle);
  }

  moveToRocket() {
    this.x = this.rocket.x - camera.x + 10;
    this.y = this.rocket.y - this.height / 2;
  }

  render(delta) {
    super.render();
    if (state.gameSpeed !== 0) {
      return;
    }
    this.moveToRocket();
    this.rotate();
    //this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

  }
}
