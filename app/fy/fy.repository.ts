import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fy } from '../../lib/entity/meta_dl/fy';
import { House } from 'lib/entity/meta_dl/house';
import { Equal, FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';

import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from 'lib/entity/dic/houseDicDl';
import { Picture } from "lib/entity/meta_dl/picture";

@Injectable()
export class FyRespository {
    constructor(
        @InjectRepository(Fy, "fmj")
        private readonly fyDlRepository: Repository<Fy>,
        @InjectRepository(Fy, "zh_erp")
        private readonly fyZhRepository: Repository<Fy>,
        @InjectRepository(House, "fmj")
        private readonly houseDlRepository: Repository<House>,
        @InjectRepository(House, "zh_erp")
        private readonly houseZhRepository: Repository<House>,
        @InjectRepository(HouseConstruction, "fmj")
        private readonly houseConstructionDlRepository: Repository<HouseConstruction>,
        @InjectRepository(HouseConstruction, "zh_erp")
        private readonly houseConstructionZhRepository: Repository<HouseConstruction>,
        @InjectRepository(HouseFitment, "fmj")
        private readonly houseFitmentRepository: Repository<HouseFitment>,
        @InjectRepository(HouseFitment, "zh_erp")
        private readonly houseFitmentZhRepository: Repository<HouseFitment>,
        @InjectRepository(HouseType, "fmj")
        private readonly houseTypeRepository: Repository<HouseType>,
        @InjectRepository(HouseType, "zh_erp")
        private readonly houseTypeZhRepository: Repository<HouseType>,
        @InjectRepository(HouseUsage, "fmj")
        private readonly houseUsageRepository: Repository<HouseUsage>,
        @InjectRepository(HouseUsage, "zh_erp")
        private readonly houseUsageZhRepository: Repository<HouseUsage>,
        @InjectRepository(HouseExpose, "fmj")
        private readonly houseExposeRepository: Repository<HouseExpose>,
        @InjectRepository(HouseExpose, "zh_erp")
        private readonly houseExposeZhRepository: Repository<HouseExpose>,
        @InjectRepository(Picture, "fmj")
        private readonly pictureRepository: Repository<Picture>,
        @InjectRepository(Picture, "zh_erp")
        private readonly pictureZhRepository: Repository<Picture>,
        @InjectRepository(HouseFeature, "fmj")
        private readonly houseFeatureRepository: Repository<HouseFeature>,
        @InjectRepository(HouseFeature, "zh_erp")
        private readonly houseFeatureZhRepository: Repository<HouseFeature>,
        @InjectRepository(HouseInnerPlant, "fmj")
        private readonly houseInnerPlantRepository: Repository<HouseInnerPlant>,
        @InjectRepository(HouseInnerPlant, "zh_erp")
        private readonly houseInnerPlantZhRepository: Repository<HouseInnerPlant>,
    ) { }

    //参数为字符串，允许的值为Object.keys(this)
    private use<T = any>(city: string, entity: new () => T) {
        switch (city) {
            case 'dl':
                city = 'fmj'
                break;
            case 'zh':
                city = 'zh_erp'
                break;
            default:
                break;
        }
        const targetRepository = Object.keys(this)
            .filter(repositoryName => String(this[repositoryName].target).split(" ")[1] === entity.name)
            .find(repositoryName => String(this[repositoryName].manager.connection.name) === city)
        return this[targetRepository]
    }

    public async find<T = any>(city: string, entity: new () => T, options?: FindManyOptions<T>) {
        return this.use<T>(city, entity).find(options)
    }
    public async insert<T = any>(city: string, entity: new () => T, data: T) {
        return this.use<T>(city, entity).insert(data)
    }
    public async update<T = any>(city: string, entity: new () => T, ...args: any[]) {
        return this.use<T>(city, entity).update(...args)
    }
    public async delete<T = any>(city: string, entity: new () => T, data: FindOptionsWhere<Fy>) {
        return this.use<T>(city, entity).delete(data)
    }
}