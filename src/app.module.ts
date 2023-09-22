import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../lib/entity/entites';
import { APP_GUARD } from '@nestjs/core';
import { AgentModule } from '../app/agent/agent.module';
import { FyModule } from '../app/fy/fy.module';
import { UserModule } from '../app/user/user.module';
import { FubabaUser } from '../lib/entity/common/user';
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
      name: configService.get('SQL_DB_DL'),
      useFactory: () => ({
        type: 'mssql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: configService.get("SQL_USER_DL"),
        password: configService.get('SQL_PASS_DL'),
        database: configService.get('SQL_DB_DL'),
        entities: entities,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        // @ts-ignore
        poolSize: 10,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      name: configService.get('SQL_USER_USER'),
      useFactory: () => ({
        type: 'mssql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: configService.get('SQL_USER_USER'),
        password: configService.get('SQL_PASS_USER'),
        database: configService.get('SQL_DB_USER'),
        entities: [FubabaUser],
        options: {
          autoReconnect: true,
          encrypt: false,
          trustServerCertificate: true,
        },
        // @ts-ignore
        poolSize: 10,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
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
