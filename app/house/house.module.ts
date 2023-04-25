import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'lib/entity/meta';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
