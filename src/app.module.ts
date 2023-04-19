import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../lib/entity/meta';
import { APP_GUARD } from '@nestjs/core';
import { AgentModule } from 'app/agent/agent.module';
// import { AuthGuard } from '../auth/guard/auth.guard';
// import { LogService } from '../ops/log/log.service';
// import { MailService } from '../ops/mail/mail.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,AgentModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: configService.get('SQL_USER'),
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
    TypeOrmModule.forFeature(entities),
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
