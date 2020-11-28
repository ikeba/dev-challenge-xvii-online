export const mock = {
    room: {
        width: 15,
        length: 20,
        height: 15
    },
    cuboids: [

        {
            x: 0,
            y: 0,
            z: 0,
            width: 5,
            length: 5,
            height: 5
        }],
    pyramids: [
        {
            x: 0,
            y: 5,
            z: 0,
            length: 5,
            height: 5
        },
    ]
}

export class Spec {
    constructor(data) {
        this.room = data.room;

        this.objects = {
            cuboids: data.cuboids,
            pyramids: data.pyramids
        };

    }
}