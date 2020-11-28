import {Figure} from "@/modules/figure";
import {FIGURE_TYPES} from "@/constants/figure-types";
import {Point, Shape} from "isomer";

export class Pyramid extends Figure {
    constructor(room, pyramid) {
        super(room, pyramid);
        this.type = FIGURE_TYPES.PYRAMID;
        room.addFloor(this.x + this.length / 2, this.y + this.length / 2, this.z + this.height, 0, 0, this.guid);
    }

    get volume() {
        return this.width * this.length * this.height;
    }

    checkRoomInterception(room) {
        this.roomInterception = this._checkRoomSideInterception(this.x, this.length, room.x, room.width);
        this.roomInterception = this._checkRoomSideInterception(this.y, this.length, room.y, room.length);
        // TODO: y interception
    }

    checkFiguresInterception(room) {
        room.objects.forEach((obj, index) => {
            if (this.guid === obj.guid) {
                return;
            }
            if (obj.type === FIGURE_TYPES.CUBOID) {
                let baseInterception;
                let sideAInterception;
                let sideBInterception;

                baseInterception = this._checkSideInterception(
                    {
                        x: this.x,
                        y: this.y,
                        x1: this.x + this.length,
                        y1: this.y + this.length

                    },
                    {
                        x: obj.x,
                        y: obj.y,
                        x1: obj.x + obj.width,
                        y1: obj.y + obj.length
                    }
                );

                const sideA = {
                    a: {
                        x: this.x,
                        y: this.z
                    },
                    b: {
                        x: this.x + this.length,
                        y: this.z
                    },
                    c: {
                        x: this.x + this.length / 2,
                        y: this.z + this.height
                    }
                };

                const sideB = {
                    a: {
                        x: this.y,
                        y: this.z
                    },
                    b: {
                        x: this.y + this.length,
                        y: this.z
                    },
                    c: {
                        x: this.y + this.length / 2,
                        y: this.z + this.height
                    }
                }

                sideAInterception = this._checkTriangleInterception(obj.x, obj.z, obj.width, obj.height, sideA);
                sideBInterception = this._checkTriangleInterception(obj.y, obj.z, obj.length, obj.height, sideB);

                const interception = (baseInterception && sideAInterception)
                    || (baseInterception && sideBInterception)
                    || (sideAInterception && sideBInterception)
                    || (baseInterception && ((this.z >= obj.z && (this.z < (obj.z + obj.height))) || (this.z + this.height) < (obj.z + obj.height)));

                if (interception && !obj.figureInterception) {
                    obj.figureInterception = interception;
                    this.figureInterception = interception;
                }
            }
        });
    }

    checkFlying(room) {
        const base = {
            x: this.x,
            y: this.y,
            x1: this.x + this.length,
            y1: this.y + this.length

        };
        super._checkFlying(room, base);
    }

    render() {
        super.render();
        this.iso.add(
            Shape.Pyramid(new Point(this.x, this.y, this.z), this.length, this.length, this.height), this.color
        );
    }
}