import { House } from "../meta/house";
import { Picture } from "../meta/picture";

/**
 * House
 */
export class HouseRes {
    houseAddress: string;
    houseArea: number;
    /**
     * 城区
     */
    houseBlock: string;
    houseBuildYear: number;
    houseConstruction: string;
    houseExpose: string;
    /**
     * 房源特色
     */
    houseFeature: HouseFeature[];
    houseFitment: string;
    houseHalls: number;
    houseId: number;
    houseMemo: string;
    houseName: string;
    houseRooms: number;
    houseKitchens: number;
    houseToilets: number;
    houseTotalFloor: number;
    houseUsage: string;
    houseInFloor: number;
    /**
     * 房源已安装设施
     */
    houseInnerPlant: HouseInnerPlant[];

    /**
     * 房源图片列表
     */
    pictures: PictureRes[];

    constructor(house: House, extra: HouseExtra) {
        this.houseAddress = house.houseAddress;
        this.houseArea = house.houseArea;
        this.houseBuildYear = house.houseBuildYear;
        this.houseHalls = house.houseHalls;
        this.houseId = house.houseId;
        this.houseInFloor = house.houseInFloor;
        this.houseKitchens = house.houseKitchens;
        this.houseMemo = house.houseMemo;
        this.houseName = house.houseName;
        this.houseRooms = house.houseRooms;
        this.houseToilets = house.houseToilets;
        this.houseTotalFloor = house.houseTotalFloor;

        this.houseFitment = extra.houseFitment;
        this.houseUsage = extra.houseUsage;
        this.houseConstruction = extra.houseConstruction;
        this.houseExpose = extra.houseExpose;
        this.houseFeature = extra.houseFeature;
        this.houseInnerPlant = extra.houseInnerPlant;
        this.pictures = extra.pictures;
    }
}


export class HouseFeature {
    /**
     * 标签code
     */
    code: string;
    /**
     * 标签名称
     */
    name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
}

export class HouseInnerPlant {
    /**
     * 设施code
     */
    code: string;
    /**
     * 设施名称
     */
    name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
}

/**
 * Picture
 */
export class PictureRes {
    /**
     * 图片id
     */
    picId: number;
    /**
     * 图片路径
     */
    picturePath: string;
    /**
     * 图片类型，1-图片，2-视频
     */
    picType: number;

    constructor(picture: Picture) {
        this.picId = picture.picId;
        this.picturePath = picture.picPath;
        this.picType = Number(picture.picType);
    }
}

export interface HouseExtra {
    houseUsage?: string;
    houseConstruction?: string;
    houseExpose?: string;
    houseFeature?: HouseFeature[];
    houseInnerPlant?: HouseInnerPlant[];
    pictures?: PictureRes[];
    houseFitment?: string;
}