import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fy } from '../../lib/entity/meta/fy';
import { In, Repository } from 'typeorm';
import { FyRes } from 'lib/entity/response/fyRes';
import { House } from 'lib/entity/meta/house';
import { HouseExtra, PictureRes } from 'lib/entity/response/houseRes';
import { HouseConstruction, HouseFeature, HouseFitment, HouseInnerPlant, HouseType } from 'lib/entity/dic/house';
import { Picture } from 'lib/entity/meta/picture';
import { Cache } from 'cache-manager';
import { AgentService } from 'app/agent/agent.service';

@Injectable()
export class FyService {
    constructor(
        private readonly agentService: AgentService,
        
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,

        @InjectRepository(Fy)
        private readonly fyRepository: Repository<Fy>,

        @InjectRepository(House)
        private readonly houseRepository: Repository<House>,

        @InjectRepository(HouseConstruction)
        private readonly houseConstructionRepository: Repository<HouseConstruction>,

        @InjectRepository(HouseFitment)
        private readonly houseFitmentRepository: Repository<HouseFitment>,

        @InjectRepository(HouseType)
        private readonly houseTypeRepository: Repository<HouseType>,

        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,

        @InjectRepository(HouseFeature)
        private readonly houseFeatureRepository: Repository<HouseFeature>,

        @InjectRepository(HouseInnerPlant)
        private readonly houseInnerPlantRepository: Repository<HouseInnerPlant>,
    ) { }


    public async getFyInfo(page: number): Promise<Array<Fy>> {
        const result = await this.fyRepository.find({
            take: 10,
            order: {
                releaseTime: 'DESC',
            }
        })

        return result;
    }

    public async getFyInfoById(reqId: string): Promise<FyRes> {
        const reqInfo = (await this.fyRepository.find({ where: { reqId: reqId } }))[0];
        const houseInfo = (await this.houseRepository.find({ where: { houseId: reqInfo.reqHusId } }))[0]
        const agentInfo = await this.agentService.getAgentInfoById(reqInfo.agentId)

        let extra: HouseExtra = {
            houseFitment: '',
            houseConstruction: '',
            pictures: [],
        }
        //装修情况
        extra.houseFitment = houseInfo.houseFitment;
        while (extra.houseFitment.indexOf(' ') != -1) {
            extra.houseFitment = extra.houseFitment.replace(' ', '');
        }
        //结构信息
        extra.houseConstruction = (await this.houseConstructionRepository.find({ where: { constructionId: houseInfo.houseConstructionCode } }))[0].construction;

        //图片信息
        const picture_origin = await this.pictureRepository.find({ where: { houseId: houseInfo.houseId } })
        extra.pictures.push(...picture_origin.map(i => new PictureRes(i)))

        //房源用途
        extra.houseUsage = (await this.houseTypeRepository.find({ where: { typeId: houseInfo.houseUsageCode } }))[0].type;

        //方向

        //内部设施
        const innerPlantCodeList = JSON.parse('[' + houseInfo.houseInnerPlantCode + ']').map((i: number) => String(i))
        extra.houseInnerPlant = (await this.houseInnerPlantRepository.find({ where: { plantId: In(innerPlantCodeList), type: 87 } }))
            .map(i => { return { code: i.plantId, name: i.plant } })
        //房源特色

        const result = new FyRes(reqInfo, agentInfo, houseInfo, extra)
        return result;
    }
}
