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
    }

    // checkFiguresInterception(room) {
    //     room.objects.forEach((obj, index) => {
    //         if (this.guid === obj.guid) {
    //             return;
    //         }
    //         // проекция х + z
    //         if (obj.type === FIGURE_TYPES.CUBOID) {
    //             this.figureInterception = this._checkSideInterception(
    //                 {
    //                     x: this.x,
    //                     y: this.z,
    //                     x1: this.x + this.width,
    //                     y1: this.z + this.height
    //
    //                 },
    //                 {
    //                     x: obj.x,
    //                     y: obj.z,
    //                     x1: obj.x + obj.width,
    //                     y1: obj.z + obj.height
    //
    //                 },
    //             );
    //
    //             // проекция y + z
    //             this.figureInterception = this._checkSideInterception(
    //                 {
    //                     x: this.y,
    //                     y: this.z,
    //                     x1: this.y + this.length,
    //                     y1: this.z + this.height
    //
    //                 },
    //                 {
    //                     x: obj.y,
    //                     y: obj.z,
    //                     x1: obj.y + obj.length,
    //                     y1: obj.z + obj.height
    //
    //                 },
    //             );
    //             // проекция x + y
    //             this.figureInterception = this._checkSideInterception(
    //                 {
    //                     x: this.x,
    //                     y: this.y,
    //                     x1: this.x + this.width,
    //                     y1: this.y + this.length
    //
    //                 },
    //                 {
    //                     x: obj.x,
    //                     y: obj.y,
    //                     x1: obj.x + obj.width,
    //                     y1: obj.y + obj.length
    //
    //                 },
    //             );
    //             return;
    //         }
    //     });
    // }



    render() {
        super.render();
        this.iso.add(
            Shape.Prism(new Point(this.x, this.y, this.z), this.width, this.length, this.height)
        );
    }
}