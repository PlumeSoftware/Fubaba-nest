import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'lib/entity/meta';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule { }
