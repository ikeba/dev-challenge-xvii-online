import {state} from "../services/state";

export class GameObject {
  constructor(props) {
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.ctx = props.ctx;
    this.rotation = 0;

    this.isMousePressed = false;
  }

  _getMouseCoords(e) {
    const canvasBoundingRectangle = state.canvas.getBoundingClientRect();
    const mouseX = e.clientX - canvasBoundingRectangle.left;
    const mouseY = e.clientY - canvasBoundingRectangle.top;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  _getRotatedCoordinates(x0, y0, x, y, angle) {
    const rad = this._degToRad(Math.round(angle ? angle : this.rotation));
    return {
      x: Math.round(x0 + (x - x0) * Math.cos(rad) - (y - y0) * Math.sin(rad)),
      y: Math.round(y0 + (y - y0) * Math.cos(rad) + (x - x0) * Math.sin(rad))
    };
  }

  isMouseOverElement(e, x0, y0) {
    const mouseX = this._getMouseCoords(e).x;
    const mouseY = this._getMouseCoords(e).y;

    const topLeft = this._getRotatedCoordinates(x0, y0, this.x, this.y);
    const topRight = this._getRotatedCoordinates(x0, y0, this.x + this.width, this.y);
    const bottomLeft = this._getRotatedCoordinates(x0, y0, this.x, this.y + this.height);
    const bottomRight = this._getRotatedCoordinates(x0, y0, this.x + this.width, this.y + this.height);

    const k1 = (topLeft.x - mouseX) * (bottomLeft.y - topLeft.y) - (bottomLeft.x - topLeft.x) * (topLeft.y - mouseY);
    const m1 = (bottomLeft.x - mouseX) * (topRight.y - bottomLeft.y) - (topRight.x - bottomLeft.x) * (bottomLeft.y - mouseY);
    const n1 = (topRight.x - mouseX) * (topLeft.y - topRight.y) - (topLeft.x - topRight.x) * (topRight.y - mouseY);

    const k2 = (bottomRight.x - mouseX) * (bottomLeft.y - bottomRight.y) - (bottomLeft.x - bottomRight.x) * (bottomRight.y - mouseY);
    const n2 = (topRight.x - mouseX) * (bottomRight.y - topRight.y) - (bottomRight.x - topRight.x) * (topRight.y - mouseY);

    return ((k1 <= 0 && m1 <= 0 && n1 <= 0) || (k1 >= 0 && m1 >= 0 && n1 >= 0)) ||
      ((k2 <= 0 && m1 <= 0 && n2 <= 0) || (k2 >= 0 && m1 >= 0 && n2 >= 0));
  }

  _onMouseDown(e) {
    if (this.isMouseOverElement(e)) {
      this.isMousePressed = true;
    }
  }

  _radToDeg(angle) {
    return angle * 180 / Math.PI;
  }

  _degToRad(angle) {
    return angle * Math.PI / 180;
  }

  _onMouseUp() {
    this.isMousePressed = false;
  }
}
