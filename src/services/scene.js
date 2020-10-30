import {Rocket} from "../game-objects/rocket";
import {Control} from "../game-objects/control";
import {Background} from "../game-objects/background";
import {Wall} from "../game-objects/wall";
import {state} from "./state";
import {Hud} from "../game-objects/hud";
import {GAME_CONFIG} from "./config";

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
        name: 'wall',
        className: Wall,
        properties: {
          x: state.wallX,
          y: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.WALL_HEIGHT
        }
      },
      {
        name: 'rocket',
        className: Rocket,
        properties: {
          x: state.x0,
          y: state.y0
        }
      },
      {
        name: 'control',
        className: Control,
        properties: {
          x: state.x0,
          y: state.y0
        }
      },
      {
        name: 'hud',
        className: Hud,
        properties: {
          x: GAME_CONFIG.GAME_WIDTH - 50,
          y: 50
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
