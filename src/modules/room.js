import {Point, Shape, Color} from "isomer";
import {Cuboid} from "@/modules/cuboid";

import {Floor} from "@/modules/floor";

export class Room {
    constructor(iso, room, objects) {
        this.iso = iso;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.width = room.width;
        this.length = room.length;
        this.height = room.height;

        this.floors = [
            new Floor(this, {
                x: 0,
                y: 0,
                z: 0,
                width: this.width,
                length: this.length,
                visible: false
            })
        ]

        this.cuboids = objects.cuboids.map((cuboid) => {
            return new Cuboid(this, cuboid);
        });

        this.checkRoomInterception();
        this.checkFiguresInterception();
        this.checkFlying();

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

    checkFlying() {
        this.cuboids.map((cuboid) => {
            cuboid.checkFlying(this);
        });
    }

    addFloor(x, y, z, width, length, guid = null) {
        this.floors.push(new Floor(this, {
            x, y, z, width, length,
             guid
        }));
    }


    render() {
        const floor = Shape.Prism(new Point(0, 0, 0), this.width, this.length, 0);
        this.iso.add(floor, new Color(211, 211, 211));
        this.cuboids.map((cuboid) => cuboid.render());
        this.floors.map((floor) => floor.render());
    }

}