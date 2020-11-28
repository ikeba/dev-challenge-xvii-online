import {Color, Point, Shape} from "isomer";

export class Floor {
    constructor(room, floor) {
        this.room = room;

        this.x = floor.x;
        this.y = floor.y;
        this.z = floor.z;
        this.width = floor.width;
        this.length = floor.length;
        this.visible = floor.visible;
        this.guid = floor.guid;

        console.log(this);
    }

    render() {
        if (this.visible === false) {
            return;
        }
        this.room.iso.add(
            Shape.Prism(new Point(this.x, this.y, this.z), this.width, this.length, 0),
            new Color(255, 251, 90));
    }
}