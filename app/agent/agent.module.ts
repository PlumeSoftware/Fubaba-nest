import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { entities as enDl } from '../../lib/entity/metaDl';
import { entities as enZh } from '../../lib/entity/metaZh';

@Module({
  imports: [
    TypeOrmModule.forFeature(enDl, "fmj"),
    TypeOrmModule.forFeature(enZh, "zh_erp")
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService]
})
export class AgentModule { }
