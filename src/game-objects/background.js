import {GameObject} from "./_game-object";
import {state} from "../services/state";

const clouds1 = './images/background/clouds_1.png';
const clouds2 = './images/background/clouds_2.png';
const sky = './images/background/sky.png';
const rocks = './images/background/rocks.png';
const floor = './images/floor.png';

function createImage(url) {
  const image = new Image();
  image.src = url;
  return image;
}

export class Background extends GameObject {
  constructor(props) {
    super(props);

    this.sky = {
      img: createImage(sky),
      speed: 0.5
    };
    this.nearClouds = {
      img: createImage(clouds1),
      speed: 1.5,
    };
    this.farClouds = {
      img: createImage(clouds2),
      speed: 1.1,
    };
    this.rocks = {
      img: createImage(rocks),
      speed: 1.3
    };
    this.floor = {
      img: createImage(floor),
      speed: 1
    };
  }

  getX(asset, isSecond = false) {
    return (((-state.cameraX * asset.speed) % this.ctx.canvas.width) + (isSecond ? this.ctx.canvas.width : 0));
  }

  drawFloor() {
    this.ctx.drawImage(this.floor.img, this.getX(this.floor), 550, this.ctx.canvas.width, 50);
    this.ctx.drawImage(this.floor.img, this.getX(this.floor, true), 550, this.ctx.canvas.width, 50);
  }

  drawSky() {
    this.ctx.drawImage(this.sky.img, this.getX(this.sky), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.sky.img, this.getX(this.sky, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawFarClouds() {
    this.ctx.drawImage(this.farClouds.img, this.getX(this.farClouds), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.farClouds.img, this.getX(this.farClouds, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawNearClouds() {
    this.ctx.drawImage(this.nearClouds.img, this.getX(this.nearClouds), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.nearClouds.img, this.getX(this.nearClouds, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawBackground() {
    this.ctx.drawImage(this.rocks.img, this.getX(this.rocks), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.rocks.img, this.getX(this.rocks, true), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  render() {
    this.drawSky();
    this.drawFarClouds();
    this.drawBackground();
    this.drawNearClouds();
    this.drawFloor();
  }
}
