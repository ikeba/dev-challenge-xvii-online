import {Rocket} from "./game-objects/rocket";
import {Control} from "./game-objects/control";
import {Background} from "./game-objects/background";

class Scene {
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
      },
      {
        name: 'control',
        className: Control,
        properties: {
          x: 0,
          y:300
        }
      }
    ]
  }

  find(name) {
    return this.structure.find((el) => el.name === name).gameObject;
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

export const scene = new Scene();
