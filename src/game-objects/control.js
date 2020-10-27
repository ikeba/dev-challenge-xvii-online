import {GameObject} from "./_game-object";
import {camera} from "../camera";

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

export class Control extends GameObject {
  constructor(x, y) {
    super(x, y);
    canvas = this.ctx.canvas;

    this.image = new Image();
    this.image.onload = () => this.imageReady = true;
    this.image.src = './images/arrow.png';
    this.angle = 60;

    this.width = 150;
    this.height = 150;

    this.isMousePressed = false;

    this.ctx.canvas.onmousedown = this.onMouseDown.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
    window.onmousemove = this.onMouseMove.bind(this);
  }

  isMouseOverElement(e) {

    const {x, y} = mouse(e);
    console.log(x, y);

    return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height);
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
    if (this.isMousePressed) {
      this.angle = 180 * Math.atan2(-(this.y - mouse(e).y), this.x + mouse(e).x) / Math.PI + 90;
      console.log(mouse(e), this.angle);
    }
  }

  rotate() {
    console.log('rotatatata', this.angle);
    if (this.angle > 90) {
      this.angle = 90;
    }
    if (this.angle < 0) {
      this.angle = 0;
    }
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(Math.PI / 180 * (this.angle));
  }

  render(delta) {
    super.render();
    this.rotate();
    this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
