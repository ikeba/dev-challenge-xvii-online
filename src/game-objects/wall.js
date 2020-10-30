import {GameObject} from "./_game-object";
import {GAME_CONFIG} from "../service/config";
import {camera} from "../camera";
import {state} from "../state";

export class Wall extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.imageReady = false;
    this.image = new Image();
    this.height = state.wallHeight;
    this.height = state.wallWidth;
    this.image.onload = () => {
      this.imageReady = true;
      this.height = this.image.height;
    };
    this.image.src = './images/wall.png';
    console.log(this.image);
  }


  render(delta) {
    super.render();

    this.ctx.drawImage(this.image, this.x - camera.x, this.y, state.wallWidth, state.wallHeight);
  }
}
