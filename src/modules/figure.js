import {guid} from "@/modules/common";
import {Color} from "isomer";

export class Figure {
    constructor(room, figure) {
        this.guid = guid();
        this.iso = room.iso;
        this.x = figure.x;
        this.y = figure.y;
        this.z = figure.z;
        this.width = figure.width;
        this.length = figure.length;
        this.height = figure.height;

        this.color = new Color(192, 192, 192);

        this.roomInterception = false;
        this.figureInterception = false;
        this.isFlying = false;
    }

    _checkRoomSideInterception(coord, size, targetCoord, targetSize) {
        return (coord < targetCoord || coord > (targetCoord + targetSize)
            || ((coord + size) < targetCoord || (coord + size) > (targetCoord + targetSize)));
    }

    _checkTriangleInterception(x, y, width, length, triangle) {
        const pointInterception = (dx, dy) => {

            function cross_product(x1, y1, x2, y2, x, y) {
                return (x - x2) * (y2 - y1) - (y - y2) * (x2 - x1);
            }

            const {a, b, c} = triangle;

            const cp1 = cross_product(a.x, a.y, b.x, b.y, dx, dy) < 0.0;
            const cp2 = cross_product(b.x, b.y, c.x, c.y, dx, y) < 0.0;
            const cp3 = cross_product(c.x, c.x, a.x, a.y, dx, dy) < 0.0;

            return cp1 === cp2 && cp2 === cp3 && cp3 === cp1;
        };

        return pointInterception(x, y)
            || pointInterception(x, y + length)
            || pointInterception(x + width, y)
            || pointInterception(x + width, y + length);

    }

    _checkSideInterception(box1, box2) {

        if (box1.x >= box2.x1 || box1.x1 <= box2.x) {
            return false;
        }

        if (box1.y >= box2.y1 || box1.y1 <= box2.y) {
            return false;
        }
        return true;
    }

    _checkFloorInterception(box1, box2) {

        if (box1.x > box2.x1 || box1.x1 < box2.x) {
            return false;
        }

        if (box1.y > box2.y1 || box1.y1 < box2.y) {
            return false;
        }
        return true;
    }

    _checkFlying(room, base) {
        const floors = room.floors;
        for (let i = 0; i < floors.length; i++) {
            if (this.guid === floors[i].guid) {
                console.log('it\'s this figure top side');
                continue;
            }
            // z must me euqal floor z
            // figure down i=side should intercept floor
            if (this.z === floors[i].z && this._checkFloorInterception(
                base,
                {
                    x: floors[i].x,
                    y: floors[i].y,
                    x1: floors[i].x + floors[i].width,
                    y1: floors[i].y + floors[i].length

                },
            )) {
                // we find at least one floor, skip other checks.
                return;
            }
        }
        this.isFlying = true;
    }

    setError() {
        this.color = new Color(255,153, 153);
    }

    render() {
        console.log('type: ', this.type);
        console.log('guid: ', this.guid);
        console.log('errors:');
        console.log('figureInterception', this.figureInterception);
        console.log('roomInterception', this.roomInterception);
        console.log('flying', this.isFlying);
        console.log('----------');
        if (this.roomInterception || this.figureInterception || this.isFlying) {
            this.setError();
        }
    }

}