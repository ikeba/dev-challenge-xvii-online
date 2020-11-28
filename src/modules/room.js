import {Point, Shape, Color} from "isomer";
import {Cuboid} from "@/modules/cuboid";

export class Room {
    constructor(iso, room, objects) {
        this.iso = iso;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.width = room.width;
        this.length = room.length;
        this.height = room.height;

        this.cuboids = objects.cuboids.map((cuboid) => {
            return new Cuboid(this.iso, cuboid);
        });

        this.checkRoomInterception();
        this.checkFiguresInterception();
        this.render();
    }

    checkRoomInterception() {
        this.cuboids.map((cuboid) => {
            cuboid.checkRoomInterception(this);
        });
    }

    checkFiguresInterception() {
        this.cuboids.map((cuboid) => {
            cuboid.checkFiguresInterception(this);
        });
    }

    render() {
        const floor = Shape.Prism(new Point(0, 0, 0), this.width, this.length, 0);
        this.iso.add(floor, new Color(211, 211, 211));
        this.cuboids.map((cuboid) => cuboid.render());
    }

}