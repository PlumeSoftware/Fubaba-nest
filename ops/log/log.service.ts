import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'ops/mail/mail.service';
import { Repository } from 'typeorm';
import { Log } from '../../lib/entity/common/log';

@Injectable()
export class LogService {
    constructor(
        private readonly mailService: MailService,
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) { }

    public async addlog(data: { createby: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string }) {
        data['createtime'] = new Date()
        return this.logRepository.insert(data)
    }
}

