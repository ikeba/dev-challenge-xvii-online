import {Rocket} from "./game-objects/rocket";

export class Scene {
  constructor() {
    this.structure = [
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
