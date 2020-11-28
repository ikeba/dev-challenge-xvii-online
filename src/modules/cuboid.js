import {Point, Shape} from "isomer";
import {guid} from "@/modules/common";

export class Cuboid {
    constructor(room, cuboid) {
        this.guid = guid();

        this.iso = room.iso;

        this.x = cuboid.x;
        this.y = cuboid.y;
        this.z = cuboid.z;
        this.width = cuboid.width;
        this.length = cuboid.length;
        this.height = cuboid.height;

        room.addFloor(this.x, this.y, this.z + this.height, this.width, this.length, this.guid);

        this.roomInterception = false;
        this.figureInterception = false;
        this.isFlying = false;
    }

    get volume() {
        return this.width * this.length * this.height;
    }

    _checkRoomSideInterception(coord, size, targetCoord, targetSize) {
        return (coord < targetCoord || coord > (targetCoord + targetSize)
            || ((coord + size) < targetCoord || (coord + size) > (targetCoord + targetSize)));
    }

    // нулевая координата и дальняя координата
    _checkSideInterception(box1, box2) {

        if (box1.x >= box2.x1 || box1.x1 <= box2.x) {
            return false;
        }

        if (box1.y >= box2.y1 || box1.y1 <= box2.y) {
            return false;
        }
        return true;
    }

    checkRoomInterception(room) {
        this.roomInterception = this._checkRoomSideInterception(this.x, this.width, room.x, room.width);
        this.roomInterception = this._checkRoomSideInterception(this.y, this.length, room.y, room.length);
        this.roomInterception = this._checkRoomSideInterception(this.z, this.height, room.z, room.height);
    }

    checkFiguresInterception(room) {
        room.cuboids.forEach((cuboid, index) => {
            if (this.guid === cuboid.guid) {
                return;
            }
            // проекция х + z
            this.figureInterception = this._checkSideInterception(
                {
                    x: this.x,
                    y: this.z,
                    x1: this.x + this.width,
                    y1: this.z + this.height

                },
                {
                    x: cuboid.x,
                    y: cuboid.z,
                    x1: cuboid.x + cuboid.width,
                    y1: cuboid.z + cuboid.height

                },
            );

            // проекция y + z
            this.figureInterception = this._checkSideInterception(
                {
                    x: this.y,
                    y: this.z,
                    x1: this.y + this.length,
                    y1: this.z + this.height

                },
                {
                    x: cuboid.y,
                    y: cuboid.z,
                    x1: cuboid.y + cuboid.length,
                    y1: cuboid.z + cuboid.height

                },
            );
            // проекция x + y
            this.figureInterception = this._checkSideInterception(
                {
                    x: this.x,
                    y: this.y,
                    x1: this.x + this.width,
                    y1: this.y + this.length

                },
                {
                    x: cuboid.x,
                    y: cuboid.y,
                    x1: cuboid.x + cuboid.width,
                    y1: cuboid.y + cuboid.length

                },
            );
        });
    }

    checkFlying(room) {
        const floors = room.floors;
        for (let i = 0; i < floors.length; i++) {
            if (this.guid === floors[i].guid) {
                console.log('this is the floor');
                continue;
            }
            // z must me euqal floor z
            // figure down i=side should intercept floor
            if (this.z === floors[i].z && this._checkSideInterception(
                {
                    x: this.x,
                    y: this.y,
                    x1: this.x + this.width,
                    y1: this.y + this.length

                },
                {
                    x: floors[i].x,
                    y: floors[i].y,
                    x1: floors[i].x + floors[i].width,
                    y1: floors[i].y + floors[i].length

                },
            )) {
                return;
            }
        }
        console.log('flying');
        this.isFlying = true;
    }

    render() {
        console.log(this.guid);
        console.log('figureInterception', this.figureInterception);
        console.log('roomInterception', this.roomInterception);
        console.log('----------');
        this.iso.add(
            Shape.Prism(new Point(this.x, this.y, this.z), this.width, this.length, this.height)
        );
    }


}