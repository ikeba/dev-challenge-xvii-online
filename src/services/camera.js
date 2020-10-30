import {state} from "./state";

class Camera {
  constructor() {
   this.x = 0;
   this.y = 0;

   this.padding = 500;
  }

  move(x) {
    if (x > state.canvas.width - this.padding) {
      camera.x = x - state.canvas.width + this.padding;
    } else {
      camera.x = 0;
    }
  }
}

export const camera = new Camera();
