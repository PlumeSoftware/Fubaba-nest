import { Controller, Get, Headers, Param } from '@nestjs/common';
import { AgentRes } from 'lib/entity/response/agentRes';
import { AgentService } from './agent.service';

@Controller('/agent')
export class AgentController {
    constructor(
        private readonly agentService: AgentService,
    ) { }


    @Get('/list')
    public async getAgentList(@Headers() header: { city: string }): Promise<any> {
        return await this.agentService.getAgentList(header.city);
    }
    @Get('/getAgentInfoById')
    public async getAgentInfoById(@Param('id') agentId: number, @Headers() header: { city: string }): Promise<AgentRes> {
        return new AgentRes(await this.agentService.getAgentInfoById(header.city, agentId));
    }
}
