import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FubabaUser } from 'lib/entity/meta_dl/user';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserInfoRes, WxAuthRes } from 'lib/entity/response/userRes';
import { Cache } from 'cache-manager';
@Injectable()
export class UserService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        @InjectRepository(FubabaUser, 'fbb_cp')
        private readonly fubabaUserRepository: Repository<FubabaUser>,
    ) { }

    public async login(code: string) {
        const result: WxAuthRes = await new Promise(r => this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.configService.get('WEAPP_ID'),
                secret: this.configService.get('WEAPP_SECRET'),
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).subscribe(data => r(data.data)));
        return this.getUserInfo(result.openid);
    }

    public async getUserInfo(openid: string): Promise<UserInfoRes> {
        const user = (await this.fubabaUserRepository.find({ where: { openId: openid } }))[0];
        return new UserInfoRes(user);
    }
}
