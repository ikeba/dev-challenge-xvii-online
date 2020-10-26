import {Rocket} from "./game-objects/rocket";
import {Background} from "./game-objects/background";

export class Scene {
  constructor() {

    this.structure = [
      {
        name: 'background',
        className: Background,
        properties: {
          x: 0,
          y: 0,
          initialX: 0
        }
      },
      {
        name: 'background-next',
        className: Background,
        properties: {
          x: 0,
          y: 0,
          initialX: 1000
        }
      },
      {
        name: 'rocket',
        className: Rocket,
        properties: {
          x: 0,
          y: 500
        }
      }
    ]
  }

  initialize(context) {
    this.structure.map((obj) => {
      obj.gameObject = new obj.className({
        ...obj.properties,
        ctx: context
      })
    });
  }

  render(delta) {
    this.structure.map((obj) => {
      obj.gameObject.render(delta);
    });
  }

}
