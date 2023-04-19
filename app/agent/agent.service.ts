import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
