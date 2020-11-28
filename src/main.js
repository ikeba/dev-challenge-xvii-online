import Isomer, {Shape, Point} from "isomer";

import {Room} from "@/modules/room";
import {Spec} from "@/modules/spec";
import {mock} from "@/modules/spec";

const iso = new Isomer(document.getElementById('iso'));


document.querySelector('#inputFile').addEventListener('change', function (e) {
    const fr = new FileReader();
    fr.onload = function () {
        console.log(fr.result);
        const result = fr.result;
        const input = result
            .split('\n')
            .filter((str) => str[0] !== '#' && str.length > 0)
            .map((str) => str.split(' '));
        const data = {
            cuboids: [],
            pyramids: []
        };
        input.map((element) => {
           if (element[0] === 'room') {
               data.room = {
                   width: +element.find((str) => str.indexOf('width') > -1).split('=')[1],
                   length: +element.find((str) => str.indexOf('length') > -1).split('=')[1],
                   height: +element.find((str) => str.indexOf('height') > -1).split('=')[1]
               };
           }
            if (element[0] === 'cuboid') {
                data.cuboids.push({
                    x: +element.find((str) => str.indexOf('x=') > -1).split('=')[1],
                    y: +element.find((str) => str.indexOf('y=') > -1).split('=')[1],
                    z: +element.find((str) => str.indexOf('z=') > -1).split('=')[1],
                    width: +element.find((str) => str.indexOf('width') > -1).split('=')[1],
                    length: +element.find((str) => str.indexOf('length') > -1).split('=')[1],
                    height: +element.find((str) => str.indexOf('height') > -1).split('=')[1]
                });
            }
            if (element[0] === 'square-pyramid') {
                data.pyramids.push({
                    x: +element.find((str) => str.indexOf('x=') > -1).split('=')[1],
                    y: +element.find((str) => str.indexOf('y=') > -1).split('=')[1],
                    z: +element.find((str) => str.indexOf('z=') > -1).split('=')[1],
                    length: +element.find((str) => str.indexOf('length') > -1).split('=')[1],
                    height: +element.find((str) => str.indexOf('height') > -1).split('=')[1]
                });
            }
        });
        const spec = new Spec(data);
        const room = new Room(iso, spec.room, spec.objects);
    }

    fr.readAsText(this.files[0]);


})