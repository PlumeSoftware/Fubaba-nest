import { CacheModule, Module } from '@nestjs/common';
import { FyController } from './fy.controller';
import { FyService } from './fy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'lib/entity/meta';
import { AgentModule } from 'app/agent/agent.module';

@Module({
  imports: [TypeOrmModule.forFeature(entities, "fbb"),
    CacheModule.register(),
    AgentModule
  ],
  controllers: [FyController],
  providers: [FyService]
})
export class FyModule { }
