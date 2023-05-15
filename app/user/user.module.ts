import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FubabaUser } from 'lib/entity/meta/user';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([FubabaUser], 'fbb_cp'),
    HttpModule,
    ConfigModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
