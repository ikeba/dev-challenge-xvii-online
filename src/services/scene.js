import {Rocket} from "../game-objects/rocket";
import {Control} from "../game-objects/control";
import {Background} from "../game-objects/background";
import {Wall} from "../game-objects/wall";
import {state} from "./state";
import {Gui} from "../game-objects/gui";
import {GAME_CONFIG} from "./config";

/**
 * A scene that contains all game objects, their initial coordinates and some methods for interaction and drawing.
 * A singleton.
 */
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

  /**
   *
   * @param {string} name GameObject name.
   */
  find(name) {
    return this.structure.find((el) => el.name === name).gameObject;
  }

  /**
   * Initializes the scene and creates instances of all game objects.
   */
  initialize() {
    this.structure.map((obj) => {
      obj.gameObject = new obj.className({
        ...obj.properties,
        ctx: state.canvas.getContext('2d')
      })
    });
  }

  /**
   * Clears the scene.
   */
  clear() {
    this.structure.map((obj) => {
      delete obj.gameObject;
    });
  }

  /**
   * Renders the scene.
   */
  render(delta) {
    this.structure.map((obj) => {
      if (obj.gameObject) {
        obj.gameObject.render(delta);
      }
    });
  }

}

export const scene = new Scene();
