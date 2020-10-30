import {GameObject} from "./_game-object";
import {GAME_CONFIG} from "../service/config";
import {state} from "../state";
import {scene} from "../scene";

let rocket;

export class Hud extends GameObject {
  constructor(x, y) {
    super(x, y);

  }

  render(delta) {
    if (!rocket) {
      rocket = scene.find('rocket');
    }
    console.log(this.x, this.y);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "right";
    this.ctx.fillText("X " + Math.round(rocket.x), this.x, this.y);
    this.ctx.fillText("Y " + Math.round(rocket.y), this.x, this.y + 50);

    this.ctx.fillText("Angle " + Math.round(state.angle), this.x, this.y + 100);
    this.ctx.fillText("Speed " + Math.round(state.speed), this.x, this.y + 150);
  }
}
