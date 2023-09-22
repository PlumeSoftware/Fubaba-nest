import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities} from '../../lib/entity/entites';

@Module({
  imports: [TypeOrmModule.forFeature(entities, "fmj")],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule { }
