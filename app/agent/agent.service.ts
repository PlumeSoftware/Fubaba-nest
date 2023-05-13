import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentRes } from 'lib/entity/response/agentRes';
import { In, Repository } from 'typeorm';
import { Agent } from '../../lib/entity/meta/agent';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent, "fbb")
        private readonly agentRepository: Repository<Agent>,
    ) { }
    //获取经纪人    
    public async getAgentList(agentIdList: Array<number> = []): Promise<Agent[]> {
        return await this.agentRepository.find({ where: { agentId: In(agentIdList) } });
    }

    public async getAgentInfoById(agentId: number): Promise<Agent> {
        const targetAgent: Agent = (await this.agentRepository.find({ where: { agentId: agentId } }))[0];
        targetAgent.agentTel = targetAgent.agentTel;
        return targetAgent
    }
}
