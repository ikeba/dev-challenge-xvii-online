import {guid} from "@/modules/common";

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

        this.roomInterception = false;
        this.figureInterception = false;
        this.isFlying = false;
    }

    _checkRoomSideInterception(coord, size, targetCoord, targetSize) {
        return (coord < targetCoord || coord > (targetCoord + targetSize)
            || ((coord + size) < targetCoord || (coord + size) > (targetCoord + targetSize)));
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

    render() {
        console.log('type: ', this.type);
        console.log('guid: ', this.guid);
        console.log('errors:');
        console.log('figureInterception', this.figureInterception);
        console.log('roomInterception', this.roomInterception);
        console.log('flying', this.isFlying);
        console.log('----------');
    }

}