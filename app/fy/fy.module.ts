import { Module } from '@nestjs/common';
import { FyController } from './fy.controller';
import { FyService } from './fy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'lib/entity/meta';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [FyController],
  providers: [FyService]
})
export class FyModule { }
