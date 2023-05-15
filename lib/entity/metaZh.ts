import { Agent } from "./meta_zh/agent";
import { Fy } from "./meta_zh/fy";
import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from "./dic/houseDicZh";
import { HouseBlock, HouseUrban } from "./meta_zh/geography";
import { House } from "./meta_zh/house";
import { Picture, PictureVr } from "./meta_zh/picture";
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