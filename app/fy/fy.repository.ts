import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fy} from '../../lib/entity/common/fy';
import { House } from 'lib/entity/common/house';
import { Equal, FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from 'lib/entity/dic/houseDict';
import { Picture } from "lib/entity/common/picture";

@Injectable()
export class FyRespository {
    constructor(
        @InjectRepository(Fy, "fmj")
        private readonly fyRepository: Repository<Fy>,
        @InjectRepository(House, "fmj")
        private readonly houseRepository: Repository<House>,
        @InjectRepository(HouseConstruction, "fmj")
        private readonly houseConstructionRepository: Repository<HouseConstruction>,
        @InjectRepository(HouseFitment, "fmj")
        private readonly houseFitmentRepository: Repository<HouseFitment>,
        @InjectRepository(HouseType, "fmj")
        private readonly houseTypeRepository: Repository<HouseType>,
        @InjectRepository(HouseUsage, "fmj")
        private readonly houseUsageRepository: Repository<HouseUsage>,
        @InjectRepository(HouseExpose, "fmj")
        private readonly houseExposeRepository: Repository<HouseExpose>,
        @InjectRepository(Picture, "fmj")
        private readonly pictureRepository: Repository<Picture>,
        @InjectRepository(HouseFeature, "fmj")
        private readonly houseFeatureRepository: Repository<HouseFeature>,
        @InjectRepository(HouseInnerPlant, "fmj")
        private readonly houseInnerPlantRepository: Repository<HouseInnerPlant>,
    ) { }

    //参数为字符串，允许的值为Object.keys(this)
    private use<T = any>(entity: new () => T) {
        const targetRepository = Object.keys(this)
            .find(repositoryName => String(this[repositoryName].target).split(" ")[1] === entity.name)
        return this[targetRepository]
    }

    public async find<T = any>(entity: new () => T, options?: FindManyOptions<T>): Promise<T[]> {
        return this.use<T>(entity).find(options)
    }
    public async insert<T = any>(entity: new () => T, data: T) {
        return this.use<T>(entity).insert(data)
    }
    public async update<T = any>(entity: new () => T, ...args: any[]) {
        return this.use<T>(entity).update(...args)
    }
    public async delete<T = any>(entity: new () => T, data: FindOptionsWhere<T>) {
        return this.use<T>(entity).delete(data)
    }
}