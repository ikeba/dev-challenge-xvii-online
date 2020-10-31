import {state} from "../services/state";

/**
 * Main class for each gameObjects, encapsulates mouse methods, coordinates and rotation methods.
 */
export class GameObject {
  constructor(props) {
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.ctx = props.ctx;
    this.rotation = 0;

    this.isMousePressed = false;
  }

  /**
   * Returns mouse coordinates.
   *
   * @param {MouseEvent} e Mouse event.
   * @return {{x: number, y: number}} Mouse coordinates.
   */
  _getMouseCoords(e) {
    const canvasBoundingRectangle = state.canvas.getBoundingClientRect();
    const mouseX = e.clientX - canvasBoundingRectangle.left;
    const mouseY = e.clientY - canvasBoundingRectangle.top;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  /**
   * Returns the coordinates of a point that has been rotated at a certain angle around a certain point.
   *
   * @param {number} x0 The X coordinate of the point around which the rotation is performed.
   * @param {number} y0 the Y coordinate of the point around which the rotation is performed.
   * @param {number} x The X coordinate of the point that is rotated.
   * @param {number} y The Y coordinate of the point that is rotated.
   * @param {number} angle Angle of rotation. In the absence of the parameter, the rotation is carried out on the angle of the
   * element in the context of which the function is called.
   *
   * @return {{x: number, y: number}} Coordinates of the point after turning.
   */
  _getRotatedCoordinates(x0, y0, x, y, angle = undefined) {
    const rad = this._degToRad(Math.round(angle ? angle : this.rotation));
    return {
      x: Math.round(x0 + (x - x0) * Math.cos(rad) - (y - y0) * Math.sin(rad)),
      y: Math.round(y0 + (y - y0) * Math.cos(rad) + (x - x0) * Math.sin(rad))
    };
  }

  /**
   * Checks if the mouse cursor is over an element. For a rectangular element (and in this game all elements are
   * rectangular), two triangles are created and the point is checked for occurrence using a vector method.
   *
   * @param {MouseEvent} e Mouse event.
   * @param {number=} x0 The X coordinate of the point around which the rotation of the element is performed.
   * @param {number=} y0 the Y coordinate of the point around which the rotation of the element is performed.
   *
   * @return {boolean} If the mouse cursor is over an element.
   */
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

  /**
   * If the mouse cursor is above an element, activate the corresponding flag.
   *
   * @param {MouseEvent} e Mouse event.
   */
  _onMouseDown(e) {
    if (this.isMouseOverElement(e)) {
      this.isMousePressed = true;
    }
  }

  /**
   * Converts radians into degrees.
   *
   * @param {number} angle Angle in radians.
   * @return {number} Angle in degrees.
   */
  _radToDeg(angle) {
    return angle * 180 / Math.PI;
  }

  /**
   * Converts degrees into radians.
   *
   * @param {number} angle Angle in degrees.
   * @return {number} Angle in radians.
   */
  _degToRad(angle) {
    return angle * Math.PI / 180;
  }

  /**
   * Deactivate the corresponding flag if the mouse button releases.
   */
  _onMouseUp() {
    this.isMousePressed = false;
  }
}
