import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../lib/entity/meta';
import { APP_GUARD } from '@nestjs/core';
import { AgentModule } from 'app/agent/agent.module';
import { FyModule } from 'app/fy/fy.module';
import { UserModule } from 'app/user/user.module';
import { FubabaUser } from 'lib/entity/meta/user';
// import { AuthGuard } from '../auth/guard/auth.guard';
// import { LogService } from '../ops/log/log.service';
// import { MailService } from '../ops/mail/mail.service';
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AgentModule, FyModule],
      name: "fbb",
      useFactory: () => ({
        type: 'mssql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: "fbb",
        password: configService.get('SQL_PASS'),
        database: configService.get('SQL_DB'),
        entities: entities,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    // 部分模块全局使用，故全局导入orm_meta文件
    TypeOrmModule.forFeature(entities, "fbb"),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      name: configService.get('SQL_USER_USER'),
      useFactory: () => ({
        type: 'mssql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: configService.get('SQL_USER_USER'),
        password: configService.get('SQL_USER_PASS'),
        database: configService.get('SQL_DB_USER'),
        entities: [FubabaUser],
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FubabaUser], configService.get('SQL_USER_USER')),
  ],
  providers: [
    //接口鉴权、日志管理和邮件功能需要全局使用
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // LogService,
    // MailService
  ],
})
export class AppModule { }
