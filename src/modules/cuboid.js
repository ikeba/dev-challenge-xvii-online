import {Point, Shape} from "isomer";
import {guid} from "@/modules/common";
import {FIGURE_TYPES} from "@/constants/figure-types";
import {Figure} from "@/modules/figure";

export class Cuboid extends Figure {
    constructor(room, cuboid) {
        super(room, cuboid);
        this.type = FIGURE_TYPES.CUBOID;
        room.addFloor(this.x, this.y, this.z + this.height, this.width, this.length, this.guid);
    }

    get volume() {
        return this.width * this.length * this.height;
    }

    checkRoomInterception(room) {
        this.roomInterception = this._checkRoomSideInterception(this.x, this.width, room.x, room.width);
        this.roomInterception = this._checkRoomSideInterception(this.y, this.length, room.y, room.length);
        this.roomInterception = this._checkRoomSideInterception(this.z, this.height, room.z, room.height);
    }

    checkFiguresInterception(room) {
        room.objects.forEach((obj, index) => {
            if (this.guid === obj.guid) {
                return;
            }
            // проекция х + z
            let XZinterception;
            let YZinterception;
            let XYinterception;
            if (obj.type === FIGURE_TYPES.CUBOID) {
                XZinterception = this._checkSideInterception(
                    {
                        x: this.x,
                        y: this.z,
                        x1: this.x + this.width,
                        y1: this.z + this.height

                    },
                    {
                        x: obj.x,
                        y: obj.z,
                        x1: obj.x + obj.width,
                        y1: obj.z + obj.height

                    },
                );

                // проекция y + z
                YZinterception = this._checkSideInterception(
                    {
                        x: this.y,
                        y: this.z,
                        x1: this.y + this.length,
                        y1: this.z + this.height

                    },
                    {
                        x: obj.y,
                        y: obj.z,
                        x1: obj.y + obj.length,
                        y1: obj.z + obj.height

                    },
                );
                // проекция x + y
                XYinterception = this._checkSideInterception(
                    {
                        x: this.x,
                        y: this.y,
                        x1: this.x + this.width,
                        y1: this.y + this.length

                    },
                    {
                        x: obj.x,
                        y: obj.y,
                        x1: obj.x + obj.width,
                        y1: obj.y + obj.length

                    },
                );
                //return;
            }
            this.figureInterception = (XZinterception && YZinterception) || (XZinterception && XYinterception) || (YZinterception && XYinterception)
            console.log('XZinterception', XZinterception);
            console.log('YZinterception', YZinterception);
            console.log('XYinterception', XYinterception);
        });
    }

    checkFlying(room) {
        const base = {
            x: this.x,
            y: this.y,
            x1: this.x + this.width,
            y1: this.y + this.length

        };
        super._checkFlying(room, base);
    }

    render() {
        super.render();
        this.iso.add(
            Shape.Prism(new Point(this.x, this.y, this.z), this.width, this.length, this.height)
        );
    }


}