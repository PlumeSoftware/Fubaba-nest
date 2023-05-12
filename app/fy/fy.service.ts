import {  CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fy } from '../../lib/entity/meta/fy';
import { Equal, In, Repository } from 'typeorm';
import { FyRes } from 'lib/entity/response/fyRes';
import { House } from 'lib/entity/meta/house';
import { HouseExtra, PictureRes, HouseFeature as HouseFeatureSet, HouseInnerPlant as HouseInnerPlantSet } from 'lib/entity/response/houseRes';
import { HouseConstruction, HouseExpose, HouseFeature, HouseFitment, HouseInnerPlant, HouseType, HouseUsage } from 'lib/entity/dic/house';
import { Picture } from 'lib/entity/meta/picture';
import { Cache } from 'cache-manager';
import { AgentService } from 'app/agent/agent.service';
import { FyInfoReq } from 'lib/entity/request/fyReq';

@Injectable()
export class FyService {
    constructor(
        private readonly agentService: AgentService,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,

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

        @InjectRepository(HouseUsage)
        private readonly houseUsageRepository: Repository<HouseUsage>,

        @InjectRepository(HouseExpose)
        private readonly houseExposeRepository: Repository<HouseExpose>,

        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,

        @InjectRepository(HouseFeature)
        private readonly houseFeatureRepository: Repository<HouseFeature>,

        @InjectRepository(HouseInnerPlant)
        private readonly houseInnerPlantRepository: Repository<HouseInnerPlant>,
    ) {
        // 初始化缓存，在一启动就生效
        setTimeout(() => {
            console.log('------------------');
            console.log('InitData start and it could be used now');
        }, 300)

        this.initDataCache();
        this.initDictCache();

        setInterval(() => {
            this.initDataCache();
        }, 1000 * 60 * 60)
    }

    private async initDataCache() {
        const ttl = 1000 * 60 * 60 * 24 * 365;
        const maxQueryItem = 2090;

        const fyList = [];
        fyList.push(...(await this.fyRepository.find({ where: { reqStatus: Equal(0) }, order: { releaseTime: "DESC" } })));
        this.cacheManager.set('fyList', fyList, ttl);

        const houseList = [];
        const agentList = [];
        const pictureList = [];


        const fyResList = [];

        process.stdout.write(`Load ${Math.ceil(fyList.length / maxQueryItem)} + need: `);

        for (let i = 0; i < fyList.length; i += maxQueryItem) {
            const queryHouse = fyList.slice(i, i + maxQueryItem).map(i => i.reqHusId);
            //去除重复
            const agentIdList = fyList.slice(i, i + maxQueryItem).map(i => i.agentId).filter((value, index, self) => self.indexOf(value) === index);

            const r1 = await this.houseRepository.find({ where: { houseId: In(queryHouse) } })
            houseList.push(...r1);
            this.cacheManager.set('houseList', houseList, ttl);

            const r2 = await this.agentService.getAgentList(agentIdList)
            agentList.push(...r2);
            this.cacheManager.set('agentList', agentList, ttl);


            const r3 = await this.pictureRepository.find({ where: { houseId: In(queryHouse) } })
            pictureList.push(...r3);
            this.cacheManager.set('pictureList', pictureList, ttl);

            const r = await Promise.all(fyList.slice(i, i + maxQueryItem).map(async i => {
                const houseInfo = houseList.find(j => j.houseId == i.reqHusId);
                const agentInfo = agentList.find(j => j.agentId == i.agentId);
                const pictureInfo = pictureList.filter(j => j.houseId == i.reqHusId);
                const extra = await this.assembleExtra(houseInfo, pictureInfo);
                return new FyRes(i, houseInfo, agentInfo, extra);
            }));
            fyResList.push(...r);
            this.cacheManager.set('fyResList', fyResList, ttl);

            process.stdout.write(`+`);
        }

        console.log("\nInitData finished, total: " + fyResList.length);
        console.log('------------------');
    }

    private async initDictCache() {
        const ttl = 1000 * 60 * 60 * 24 * 365;

        const houseConstructionList = await this.houseConstructionRepository.find();
        await this.cacheManager.set('houseConstructionList', houseConstructionList, ttl);

        const houseFitmentList = await this.houseFitmentRepository.find();
        await this.cacheManager.set('houseFitmentList', houseFitmentList, ttl);

        const houseTypeList = await this.houseTypeRepository.find();
        await this.cacheManager.set('houseTypeList', houseTypeList, ttl);

        const houseUsageList = await this.houseUsageRepository.find();
        await this.cacheManager.set('houseUsageList', houseUsageList, ttl);

        const houseExposeList = await this.houseExposeRepository.find();
        await this.cacheManager.set('houseExposeList', houseExposeList, ttl);

        const houseFeatureList = await this.houseFeatureRepository.find();
        await this.cacheManager.set('houseFeatureList', houseFeatureList, ttl);

        const houseInnerPlantList = await this.houseInnerPlantRepository.find({ where: { type: 88 } });
        await this.cacheManager.set('houseInnerPlantList', houseInnerPlantList, ttl);

    }

    private async assembleExtra(houseInfo: House, pictureList: Array<Picture>): Promise<HouseExtra> {
        const houseConstructionList = await this.cacheManager.get<HouseConstruction[]>('houseConstructionList');
        const houseUsageList = await this.cacheManager.get<HouseUsage[]>('houseUsageList');
        const houseExposeList = await this.cacheManager.get<HouseExpose[]>('houseExposeList');
        const houseFeatureList = await this.cacheManager.get<HouseFeature[]>('houseFeatureList');
        const houseInnerPlantList = await this.cacheManager.get<HouseInnerPlant[]>('houseInnerPlantList');

        const houseFeature = []
        const houseInnerPlant = []
        if (houseInfo?.houseFeatureCode) {
            const houseFeatureCodeList = houseInfo.houseFeatureCode.split(',');
            houseFeatureCodeList.forEach(i => {
                const item = houseFeatureList.find(j => j.featureId.includes(i));
                if (item) {
                    houseFeature.push(new HouseFeatureSet(item.featureId, item.feature));
                }
            });
        }
        if (houseInfo?.houseInnerPlantCode) {
            const houseInnerPlantCodeList = houseInfo.houseInnerPlantCode.split(',');
            houseInnerPlant.push(...houseInnerPlantList.filter(i => houseInnerPlantCodeList.includes(i.plantId)));
        }
        const extra: HouseExtra = {
            houseFitment: houseInfo?.houseFitment || '',
            houseConstruction: houseConstructionList.find(i => i.constructionId == houseInfo?.houseConstructionCode)?.construction || '',
            pictures: pictureList.filter(i => i.houseId == houseInfo?.houseId).map(i => new PictureRes(i)),
            houseUsage: houseInfo?.houseUsageCode ? houseUsageList.find(i => i.usageId == houseInfo?.houseUsageCode)?.usage : '',
            houseExpose: houseExposeList.find(i => i.exposeId == houseInfo?.houseExposeCode)?.expose || '',
            houseFeature,
            houseInnerPlant,
        }
        return extra;
    }

    // true,name,小区,string,房源名称，搜索值
    // true,price,"20,60",string,总价区间，或固定值 A 0-40  B 40-60 C 60-80 D 80-100 E 100-150 F 150-200 G 200+
    // true,area,"A,B,C",string,固定值 A 0-50 B 50-70 C 70-90 D 90-110 E 110-130 F 130-150 G 150-200 H 200+
    // true,room,"2,1,0,0",string,室/厅/厨/卫数量，0表示不限制，当前小程序仅需考虑室
    // true,expose,"SN,S",string,SN 南北 S 南 EW 东西 ES 东南 WS 西南
    // true,floor,"L,M",string,"L 低楼层[1,6] M 中楼层[6,9] H 高楼层[10,+]"
    // true,build_year,5,integer,服务端计算，不需要给年份
    // true,fitment,"A,C",string,A 清水 B 简装 C 精装 D 普装 E 豪装
    // true,usage,"A,B",string,A 普通住宅 B 公建 C 别墅 D 商铺 E 写字楼
    // true,construct,"A,B,C",string,A 框架 B 砖混 C 钢筋混凝土 D 砖木 E 其它
    // true,sort,TN,string,TN 最新发布 PA 价格升序 PD 价格降序 AA 面积升序 AD 面积降序

    //筛选器生成器

    //转换参数成为find的where
    //不用进一步抽象了，再往上提真不好运维了
    private async filter2Where(type: string, value: string | number): Promise<(info: FyRes) => boolean> {
        switch (type) {
            case "price":
                switch (value) {
                    case "A": return function (fy: FyRes) { return fy.reqAmt <= 40 };
                    case "B": return function (fy: FyRes) { return fy.reqAmt >= 40 && fy.reqAmt <= 60 };
                    case "C": return function (fy: FyRes) { return fy.reqAmt >= 60 && fy.reqAmt <= 80 };
                    case "D": return function (fy: FyRes) { return fy.reqAmt >= 80 && fy.reqAmt <= 100 };
                    case "E": return function (fy: FyRes) { return fy.reqAmt >= 100 && fy.reqAmt <= 150 };
                    case "F": return function (fy: FyRes) { return fy.reqAmt >= 150 && fy.reqAmt <= 200 };
                    case "G": return function (fy: FyRes) { return fy.reqAmt > 200 };
                }
            case "area":
                switch (value) {
                    case "A": return function (fy: FyRes) { return fy.houseInfo?.houseArea <= 50 };
                    case "B": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 50 && fy.houseInfo?.houseArea <= 70 };
                    case "C": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 70 && fy.houseInfo?.houseArea <= 90 };
                    case "D": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 90 && fy.houseInfo?.houseArea <= 110 };
                    case "E": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 110 && fy.houseInfo?.houseArea <= 130 };
                    case "F": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 130 && fy.houseInfo?.houseArea <= 150 };
                    case "G": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 150 && fy.houseInfo?.houseArea <= 200 };
                    case "H": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 200 };
                }
            case "room":
                return function (fy: FyRes) { return fy.houseInfo?.houseRooms == value };
            case "expose": {
                const houseExposeList = await this.cacheManager.get<HouseExpose[]>('houseExposeList');
                //将查询值转换为数据库可用值
                const expose = value.toString().replace('S', '南').replace('N', '北').replace('E', '东').replace('W', '西');
                return function (fy: FyRes) { return fy.houseInfo?.houseExpose == houseExposeList.find(i => i.expose == expose)?.expose };
            }
            case "floor":
                switch (value) {
                    case "L": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor <= 6 };
                    case "M": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor > 6 && fy.houseInfo?.houseInFloor <= 9 };
                    case "H": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor > 9 };
                }
            case "fitment":
                const houseFitmentList = await this.cacheManager.get<HouseFitment[]>('houseFitmentList');
                //将houseFitmentCode转换为字典
                const dickey = ["A", "B", "C", "D", "E"]
                const dic = houseFitmentList.map((i, index) => { return { key: dickey[index], value: i.fitment } })
                return function (fy: FyRes) { return dic.find(i => i.value == fy.houseInfo?.houseFitment)?.key == value };
            case "usage":
                const houseUsageList = await this.cacheManager.get<HouseUsage[]>('houseUsageList');
                switch (value) {
                    case "A": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "普通住宅")?.usage };
                    case "B": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "公建")?.usage };
                    case "C": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "别墅")?.usage };
                    case "D": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "商铺")?.usage };
                    case "E": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "写字楼")?.usage };
                }
            case "construct":
                const houseConstructionList = await this.cacheManager.get<HouseConstruction[]>('houseConstructionList');
                switch (value) {
                    case "A": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "框架")?.construction };
                    case "B": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "砖混")?.construction };
                    case "C": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "钢筋混凝土")?.construction };
                    case "D": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "砖木")?.construction };
                    case "E": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "其它")?.construction };

                }
            // case "sort":
            //     switch (value) {
            //         case "TN": return { releaseTime: "DESC" };
            //         case "PA": return { reqAmt: "ASC" };
            //         case "PD": return { reqAmt: "DESC" };
            //         case "AA": return { houseArea: "ASC" };
            //         case "AD": return { houseArea: "DESC" };
            //     }
        }
    }

    public async getFyInfoById(reqId: string): Promise<FyRes> {
        //房源基础信息
        const fyInfo = (await this.fyRepository.find({ where: { reqId: reqId } }))[0];
        const houseInfo = (await this.houseRepository.find({ where: { houseId: fyInfo.reqHusId } }))[0];
        const agentInfo = await this.agentService.getAgentList([fyInfo.agentId])[0];
        const pictureList = await this.pictureRepository.find({ where: { houseId: houseInfo.houseId } });

        //房源额外信息
        const extra = await this.assembleExtra(houseInfo, pictureList);

        return new FyRes(fyInfo, houseInfo, agentInfo, extra);
    }


    public async getFyInfo(page: number = 0, filter: FyInfoReq, sort: string): Promise<FyRes[]> {
        //js filter
        //相同字段的筛选为或关系，不同字段的筛选为与关系
        const houseFilter: any = {}

        await Promise.all(Object.keys(filter).map(async (key) => {
            if (filter[key]) {
                //找到需要筛选的字段
                filter[key].split(',').forEach(async (value: string | number) => {
                    //将筛选值转化为筛选器
                    if (!houseFilter[key]) houseFilter[key] = [];
                    houseFilter[key].push(await this.filter2Where(key, value));
                });
            }
        }));

        const result: FyRes[] = [];
        const fyResList = await this.cacheManager.get<FyRes[]>('fyResList');
        fyResList.find((i, index) => {
            let match: Boolean;
            const matchList = []
            //或关系,相同字段的筛选满足一个即可
            Object.keys(houseFilter).forEach(key => {
                matchList.push(houseFilter[key].some((f: Function) => f(i)));
            });
            //与关系，不同字段的筛选存在则都要满足
            match = matchList.every((i: Boolean) => i);
            if (match) {
                result.push(i);
            }
            return result.length >= 10 || index > fyResList.length - 1;
        });
        return result;
    }
}
