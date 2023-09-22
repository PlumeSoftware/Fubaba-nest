import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FubabaUser } from '../../lib/entity/common/user';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserInfoRes, WxAuthRes } from '../../lib/entity/response/userRes';
import { Cache } from 'cache-manager';
import { AgentService } from '../agent/agent.service';
@Injectable()
export class UserService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly agentService: AgentService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        @InjectRepository(FubabaUser, 'fbb_cp')
        private readonly fubabaUserRepository: Repository<FubabaUser>,
    ) { }

    public async login(city: string, code: string) {
        const result: WxAuthRes = await new Promise(r => this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.configService.get('WEAPP_ID'),
                secret: this.configService.get('WEAPP_SECRET'),
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).subscribe(data => r(data.data)));
        return this.getUserInfo(city, result.openid);
    }

    public async getUserInfo(city: string, openid: string): Promise<UserInfoRes> {
        const user = (await this.fubabaUserRepository.find({ where: { openid } }))[0];
        let bindInfo = null;
        if (user.agentId && user.agentCity) {
            bindInfo = this.agentService.getAgentInfoById(city, user.agentId);
        }
        return new UserInfoRes(user, null, bindInfo);
    }
}
