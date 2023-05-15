import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FubabaUser } from 'lib/entity/meta/user';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(FubabaUser, 'fbb_cp')
        private readonly fubabaUserRepository: Repository<FubabaUser>,
    ) {
        this.login("abc");
    }

    public async login(code: string) {
        const result = await new Promise(r => this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.configService.get('WEAPP_ID'),
                secret: this.configService.get('WEAPP_SECRET'),
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).subscribe(data => r(data.data)));
        console.log(result);
    }
}
