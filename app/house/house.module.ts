import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities as enDl } from '../../lib/entity/metaDl';
import { entities as enZh } from '../../lib/entity/metaZh';

@Module({
  imports: [TypeOrmModule.forFeature(enDl, "fmj"),
   TypeOrmModule.forFeature(enZh, "zh_erp")],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule { }
