import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { entities } from '../../lib/entity/entites';
import { AgentRepository } from './agent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities, "fmj"),
    CacheModule.register(),
  ],
  controllers: [AgentController],
  providers: [AgentService, AgentRepository],
  exports: [AgentService]
})
export class AgentModule { }
