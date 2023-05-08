import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentRes } from 'lib/entity/response/agentRes';
import { Repository } from 'typeorm';
import { Agent } from '../../lib/entity/meta/agent';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>,
    ) { }

    //获取所有经纪人    
    public async getAgentList(): Promise<Agent[]> {
        return await this.agentRepository.find();
    }

    public async getAgentInfoById(agentId: number): Promise<Agent> {
        const targetAgent: Agent = (await this.agentRepository.find({ where: { agentId: agentId }}))[0];
        // 去除空格
        while (targetAgent.agentTel.indexOf(' ') != -1) {
            targetAgent.agentTel = targetAgent.agentTel.replace(' ', '');
        }
        return targetAgent
    }
}
