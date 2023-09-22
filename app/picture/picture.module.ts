import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'lib/entity/entites';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
