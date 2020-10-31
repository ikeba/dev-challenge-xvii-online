import {GameObject} from "./_game-object";
import {state} from "../services/state";

const clouds1 = './images/background/clouds_1.png';
const clouds2 = './images/background/clouds_2.png';
const sky = './images/background/sky.png';
const rocks = './images/background/rocks.png';
const floor = './images/floor.png';

/**
 * Creates an Image element.
 *
 * @param {string} url Image url.
 * @return {HTMLImageElement} Image element.
 */
function createImage(url) {
  const image = new Image();
  image.src = url;
  return image;
}


/**
 * A background element with Image and speed.
 * @typedef {Object<HTMLImageElement, number>} BackgroundElement
 * @property {HTMLImageElement} img Background element.
 * @property {number} speed The speed at which the object moves relative to the camera.
 */

/**
 * A class that is responsible for creating and displaying the parallax background.
 *
 * @extends GameObject
 */
export class Background extends GameObject {
  constructor(props) {
    super(props);

    /**
     * @property {BackgroundElement} sky Main background element, should run slowly.
     */
    this.sky = {
      img: createImage(sky),
      speed: 0.5
    };

    /**
     * @property {BackgroundElement} nearClouds The closest background element, should run very fast.
     */
    this.nearClouds = {
      img: createImage(clouds1),
      speed: 1.5,
    };

    /**
     * @property {BackgroundElement} farClouds Medium background element, should run close to the camera speed.
     */
    this.farClouds = {
      img: createImage(clouds2),
      speed: 1.1,
    };

    /**
     * @property {BackgroundElement} rocks Medium background element, should run close to the camera speed.
     */
    this.rocks = {
      img: createImage(rocks),
      speed: 1.3
    };

    /**
     * @property {BackgroundElement} rocks Scene floor, should run wuth the camera speed.
     */
    this.floor = {
      img: createImage(floor),
      speed: 1
    };
  }

  /**
   * Returns the X coordinate, where the background element should be at the moment, depending on the camera position
   * and the specified speed of the element.
   *
   * @param {BackgroundElement} asset Background element.
   * @param {boolean} isSecond There must be two images so that one can be replaced by the other while the first one
   * goes out of the camera. If the second image is drawn in the current cycle, it should be one canvas width to the right.
   *
   * @return {number} THe X coordinate.
   */
  getX(asset, isSecond = false) {
    return (((-state.cameraX * asset.speed) % this.ctx.canvas.width) + (isSecond ? this.ctx.canvas.width : 0));
  }

  /**
   * Draws the floor.
   */
  drawFloor() {
    this.ctx.drawImage(this.floor.img, this.getX(this.floor), 550, this.ctx.canvas.width, 50);
    this.ctx.drawImage(this.floor.img, this.getX(this.floor, true), 550, this.ctx.canvas.width, 50);
  }

  /**
   * Draws the sky.
   */
  drawSky() {
    this.ctx.drawImage(this.sky.img, this.getX(this.sky), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.sky.img, this.getX(this.sky, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Draws far clouds.
   */
  drawFarClouds() {
    this.ctx.drawImage(this.farClouds.img, this.getX(this.farClouds), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.farClouds.img, this.getX(this.farClouds, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Draws near clouds.
   */
  drawNearClouds() {
    this.ctx.drawImage(this.nearClouds.img, this.getX(this.nearClouds), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.nearClouds.img, this.getX(this.nearClouds, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Draws the rocks.
   */
  drawRocks() {
    this.ctx.drawImage(this.rocks.img, this.getX(this.rocks), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.rocks.img, this.getX(this.rocks, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Draws all elements of the background one by one.
   */
  render() {
    this.drawSky();
    this.drawFarClouds();
    this.drawRocks();
    this.drawNearClouds();
    this.drawFloor();
  }
}
