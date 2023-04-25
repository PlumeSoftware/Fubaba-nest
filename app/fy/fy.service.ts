import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fy } from '../../lib/entity/meta/fy';
import { Repository } from 'typeorm';

@Injectable()
export class FyService {
    constructor(
        @InjectRepository(Fy)
        private readonly fyRepository: Repository<Fy>,
    ){}

    //获取房源信息  
    public async getAgentList(): Promise<Fy[]> {
        return await this.fyRepository.find();
    }
}
