import { Agent } from "./common/agent";
import { Fy } from "./common/fy";
import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from "./dic/houseDict";
import { HouseBlock, HouseUrban } from "./common/geography";
import { House } from "./common/house";
import { Picture, PictureVr } from "./common/picture";
import { FubabaUser } from "./common/user";

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