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
    public async getFyInfo(@Req() req: { query: FyInfoReq }, @Headers() header: { openid: string }): Promise<UsualRes<Array<any>>> {
        const fyInfo = await this.fyService.getFyInfo(req.query.page, req.query, req.query.sort);
        if (header?.openid) {
            const userInfo = await this.userService.getUserInfo(header.openid);
            if (userInfo) {
                if (userInfo.ban) {
                    return new UsualRes(-1, 'error: unfriend user', []);
                }
                if (userInfo.agentId) {
                    const agentInfo = await this.agentService.getAgentInfoById(userInfo.agentId);
                    if (agentInfo) {
                        fyInfo.forEach(fy => fy.agentInfo = agentInfo);
                    }
                }
            }
        }
        return new UsualRes(0, 'success', fyInfo);
    }

    @Get('getFyInfoById')
    public async getFyInfoById(@Query('id') id: string, @Headers() header: { openid: string }): Promise<UsualRes<any>> {
        const fyInfo = await this.fyService.getFyInfoById(id);
        if (!fyInfo) {
            return new UsualRes(-1, 'error: not exist id', null);
        }
        if (header?.openid) {
            const userInfo = await this.userService.getUserInfo(header.openid);
            if (userInfo) {
                if (userInfo.ban) {
                    return new UsualRes(-1, 'error: unfriend user', []);
                }
            }
            if (userInfo.agentId) {
                const agentInfo = await this.agentService.getAgentInfoById(userInfo.agentId);
                if (agentInfo) {
                    fyInfo.agentInfo = agentInfo;
                }
            }
        }
        return new UsualRes(0, 'success', fyInfo);
    }
}
