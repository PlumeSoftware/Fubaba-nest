import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { AgentRes } from 'lib/entity/response/agentRes';
import { In, Like } from 'typeorm';
import { Agent } from '../../lib/entity/common/agent';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
    constructor(
        private readonly repository: AgentRepository,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }
    //获取经纪人    
    public async getAgentList(agentIdList: Array<number> = []): Promise<Agent[]> {
        return await this.repository.find(Agent, { where: { agentId: In(agentIdList) } });
    }

    //获取经纪人信息
    public async getAgentInfoById(agentId: number): Promise<Agent> {
        const targetAgent: Agent = (await this.repository.find(Agent, { where: { agentId: agentId } }))[0];
        return targetAgent
    }
    public async getAgentInfoByPhone(phone: string): Promise<Agent> {
        const targetAgent = (await this.repository.find(Agent, { where: { agentTel: Like(`%${phone}%`) } }))[0];
        return targetAgent
    }
}
