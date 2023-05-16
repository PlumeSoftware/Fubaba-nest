import { Agent } from "./meta_dl/agent";
import { Fy } from "./meta_dl/fy";
import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from "./dic/houseDicDl";
import { HouseBlock, HouseUrban } from "./meta_dl/geography";
import { House } from "./meta_dl/house";
import { Picture, PictureVr } from "./meta_dl/picture";
import { FubabaUser } from "./meta_dl/user";

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
   HouseInnerPlant,
   HouseFeature
]