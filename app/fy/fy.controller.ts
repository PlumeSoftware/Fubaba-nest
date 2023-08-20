import { Controller, Get, Headers, Query, Req } from '@nestjs/common';
import { AgentService } from 'app/agent/agent.service';
import { UserService } from 'app/user/user.service';
import { FyInfoReq } from 'lib/entity/request/fyReq';
import { FyRes } from 'lib/entity/response/fyRes';
import { UsualRes } from '../../lib/entity/response/usualRes';
import { FyService } from './fy.service';

@Controller('fy')
export class FyController {
    constructor(
        private readonly fyService: FyService,
        private readonly agentService: AgentService,
        private readonly userService: UserService,
    ) { }

    @Get('getFyInfo')
    public async getFyInfo(@Req() req: { query: FyInfoReq }, @Headers() header: { openid: string, city: string }): Promise<UsualRes<Array<FyRes>>> {
        const fyInfo = await this.fyService.getFyInfo(header.city, req.query.page, req.query, req.query.sort);
        if (header?.openid) {
            const userInfo = await this.userService.getUserInfo(header.city, header.openid);
            if (userInfo) {
                if (userInfo.ban) {
                    return new UsualRes(-1, 'error: unfriend user', []);
                }
                //检查是否是经纪人
                const isAgent = (await this.agentService.getAgentInfoByPhone(header.city, userInfo.phone)) ? true : false;
                if (isAgent) {
                    fyInfo.forEach(fy => fy.agentInfo.agentTel = fy.agentInfo.agentInnerTel);
                } else {
                    if (userInfo.agentId) {
                        const agentInfo = await this.agentService.getAgentInfoById(header.city, userInfo.agentId);
                        if (agentInfo) {
                            fyInfo.forEach(fy => fy.agentInfo = agentInfo);
                        }
                    }

                }
            }
        } else {
            return new UsualRes(-1, 'error: not login', []);
        }
        return new UsualRes(0, 'success', fyInfo);
    }

    @Get('getFyInfoById')
    public async getFyInfoById(@Query('id') id: number, @Headers() header: { openid: string, city: string }): Promise<UsualRes<FyRes>> {
        const fyInfo = await this.fyService.getFyInfoById(id, header.city);
        if (!fyInfo) {
            return new UsualRes(-1, 'error: not exist id', null);
        }
        //用户登录的情况下，进行更多检查
        if (header?.openid) {
            const userInfo = await this.userService.getUserInfo(header.city, header.openid);
            if (userInfo) {
                if (userInfo.ban) {
                    return new UsualRes(-1, 'error: unfriend user', null);
                }
            }
            //检查是否是经纪人
            const isAgent = (await this.agentService.getAgentInfoByPhone(header.city, userInfo.phone)) ? true : false;

            //如果是经纪人，将经纪人电话改为内部电话
            if (isAgent) {
                const innerTel = fyInfo.agentInfo.agentInnerTel;
                if (innerTel !== null) fyInfo.agentInfo.agentTel = innerTel;
            } else {
                //如果不是经纪人，检查是否绑定了经纪人，并将绑定经纪人信息代替原信息
                if (userInfo.agentId) {
                    const agentInfo = await this.agentService.getAgentInfoById(header.city, userInfo.agentId);
                    if (agentInfo) {
                        fyInfo.agentInfo = agentInfo;
                    }
                }
            }
        } else {
            return new UsualRes(-1, 'error: not login', null);
        }
        return new UsualRes(0, 'success', fyInfo);
    }
}
