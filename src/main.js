import Isomer, {Shape, Point} from "isomer";

import {Room} from "@/modules/room";
import {Spec} from "@/modules/spec";
import {mock} from "@/modules/spec";

const iso = new Isomer(document.getElementById('iso'));

const spec = new Spec(mock);

const room = new Room(iso, spec.room, spec.objects);