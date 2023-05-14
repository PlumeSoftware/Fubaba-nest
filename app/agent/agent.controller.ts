import { Controller, Get, Param } from '@nestjs/common';
import { AgentRes } from 'lib/entity/response/agentRes';
import { AgentService } from './agent.service';

@Controller('/agent')
export class AgentController {
    constructor(
        private readonly agentService: AgentService,
    ) { }


    @Get('/list')
    public async getAgentList(): Promise<any> {
        return await this.agentService.getAgentList();
    }
    @Get('/getAgentInfoById')
    public async getAgentInfoById(@Param('id') agentId: number): Promise<AgentRes> {
        return new AgentRes(await this.agentService.getAgentInfoById(agentId));
    }
}
