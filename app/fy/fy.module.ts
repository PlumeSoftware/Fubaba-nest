import { CacheModule, Module } from '@nestjs/common';
import { FyController } from './fy.controller';
import { FyService } from './fy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'app/agent/agent.module';
import { UserModule } from 'app/user/user.module';
import { entities} from '../../lib/entity/entites';
import { FyRespository } from './fy.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities, "fmj"),
    CacheModule.register(),
    AgentModule,
    UserModule
  ],
  controllers: [FyController],
  providers: [FyService, FyRespository]
})
export class FyModule { }
