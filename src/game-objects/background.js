import {GameObject} from "./_game-object";
import {camera} from "../camera";

const clouds1 = './images/background/clouds_1.png';
const clouds2 = './images/background/clouds_2.png';
const clouds3 = './images/background/clouds_3.png';
const clouds4 = './images/background/clouds_4.png';

const rocks1 = './images/background/rocks_1.png';
const rocks2 = './images/background/rocks_2.png';

const sky = './images/background/sky.png';

const backgroundSrc = './images/background.png';

function createImage(url) {
  const image = new Image();
  image.src = url;
  return image;
}

export class Background extends GameObject {
  constructor(props) {
    super(props);
    this.initialX = props.initialX || 0;

    // this.sky = {
    //   img: createImage(sky),
    //   speed: 0.5
    // };
    // this.clouds2 = {
    //   img: createImage(clouds2),
    //   speed: 1
    // };
    // this.clouds3 = {
    //   img: createImage(clouds3),
    //   speed: 1
    // };
    // this.rocks1 = {
    //   img: createImage(rocks1),
    //   speed: 1.5
    // };
    // this.rocks2 = {
    //   img: createImage(rocks2),
    //   speed: 1
    // };
    this.backgroundSrc = {
      img: createImage(backgroundSrc),
      speed: 1
    };
  }

  render() {
    super.render();

    const getX = (asset) => {
      const x = (((-camera.x) % this.ctx.canvas.width) + this.initialX);
      return x;
    };

    //this.ctx.drawImage(this.sky.img, getX(this.sky), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.ctx.drawImage(this.clouds2.img, getX(this.clouds2), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.ctx.drawImage(this.clouds3.img, getX(this.clouds3), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.ctx.drawImage(this.rocks1.img, getX(this.rocks1), this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.backgroundSrc.img, getX(this.backgroundSrc), this.y, this.ctx.canvas.width, this.ctx.canvas.height);


    //this.ctx.drawImage(this.image0, this.x, this.y, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.ctx.drawImage(this.image1, this.x + this.ctx.canvas.width, this.y, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
