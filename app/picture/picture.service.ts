import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from 'lib/entity/common/picture';
import { Repository } from 'typeorm';

@Injectable()
export class PictureService {
    constructor(
        @InjectRepository(Picture)
        private readonly fyRepository: Repository<Picture>,
    ){}

    //获取房源信息  
    public async getAgentList(): Promise<Picture[]> {
        return await this.fyRepository.find();
    }
}
