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

    const mouseX = mouse(e).x;
    const mouseY = mouse(e).y;

    const rad = this.angle * 180 / Math.PI;
    const x0 = this.x + this.width / 2;
    const y0 = this.y + this.height / 2;

    const x = x0 + (mouseX - x0) * Math.cos(rad) - (mouseY - y0) * Math.sin(rad);

    const y = y0 + (mouseY - y0) * Math.cos(rad) + (mouseX - x0) * Math.sin(rad);

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

      let mouseX = mouse(e).x - this.x;
      let mouseY = mouse(e).y - this.y - this.height / 2;

      const x0 = 0;
      const y0 = this.height / 2;

      console.log('x0 ', x0);
      console.log('y0 ', y0);
      console.log('mouseX ', mouseX);
      console.log('mouseY ', mouseY);

      if (mouseX < 0 || mouseY > 0) {
        return;
      }

      //this.angle = Math.atan2(mouse(e).y - (this.y + this.height / 2), (this.x + this.width / 2) + mouse(e).x) / Math.PI * 180;
      //const angle = (x0 * mouseX + y0 * mouseY) / (Math.sqrt(x0 * x0 + y0 * y0) * Math.sqrt(mouseX * mouseX + mouseY * mouseY));
      //console.log('angle= ', Math.acos(angle) * 180 / Math.PI);
      console.log('angle= ', Math.atan(mouseY / mouseX) * 180 / Math.PI);
      this.angle = Math.atan(mouseY / mouseX) * 180 / Math.PI + 90;
      //console.log(mouse(e), this.angle);
    }
  }

  rotate() {
    //console.log('rotatatata', this.angle);
    if (this.angle > 90) {
      this.angle = -90;
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
    //this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
