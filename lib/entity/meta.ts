import { Agent } from "../entity/meta/agent";
import {Fy} from "../entity/meta/fy";
import { HouseConstruction, HouseExpose, HouseFitment, HouseType, HouseUsage } from "./dic/house";
import { HouseBlock, HouseUrban } from "./meta/geography";
import { House } from "./meta/house";
import { Picture, PictureVr } from "./meta/picture";

export const entities = [
   Agent,
   Fy,
   House,
   Picture,
   PictureVr,
   HouseUrban,
   HouseBlock,
   HouseConstruction,
   HouseType,
   HouseUsage,
   HouseFitment,
   HouseExpose,
]