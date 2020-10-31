import {Rocket} from "../game-objects/rocket";
import {Control} from "../game-objects/control";
import {Background} from "../game-objects/background";
import {Wall} from "../game-objects/wall";
import {state} from "./state";
import {Gui} from "../game-objects/gui";
import {GAME_CONFIG} from "./config";

class Scene {
  constructor() {

    this.structure = [
      {
        name: 'background',
        className: Background,
        properties: {
          x: 0,
          y: 0
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
        className: Gui,
        properties: {
          x: GAME_CONFIG.HUD_X,
          y: GAME_CONFIG.HUD_Y
        }
      }
    ]
  }

  find(name) {
    return this.structure.find((el) => el.name === name).gameObject;
  }

  initialize() {
    this.structure.map((obj) => {
      obj.gameObject = new obj.className({
        ...obj.properties,
        ctx: state.canvas.getContext('2d')
      })
    });
  }

  clear() {
    this.structure.map((obj) => {
      delete obj.gameObject;
    });
  }

  render(delta) {
    this.structure.map((obj) => {
      if (obj.gameObject) {
        obj.gameObject.render(delta);
      }
    });
  }

}

export const scene = new Scene();
