import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'lib/entity/meta_dl/house';
import { Repository } from 'typeorm';

@Injectable()
export class HouseService {
    constructor(
        @InjectRepository(House)
        private readonly fyRepository: Repository<House>,
    ){}

    //获取房源信息  
    public async getAgentList(): Promise<House[]> {
        return await this.fyRepository.find();
    }
}
