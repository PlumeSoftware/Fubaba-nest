import { CacheModule, Module } from '@nestjs/common';
import { FyController } from './fy.controller';
import { FyService } from './fy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'app/agent/agent.module';
import { UserModule } from 'app/user/user.module';
import { entities as enDl } from '../../lib/entity/metaDl';
import { entities as enZh } from '../../lib/entity/metaZh';

@Module({
  imports: [
    TypeOrmModule.forFeature(enDl, "fmj"),
    TypeOrmModule.forFeature(enZh, "zh_erp"),
  imports: [TypeOrmModule.forFeature(entities, "fbb"),
    CacheModule.register(),
    AgentModule,
    UserModule
  ],
  controllers: [FyController],
  providers: [FyService]
})
export class FyModule { }
