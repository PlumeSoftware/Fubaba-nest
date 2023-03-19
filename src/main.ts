import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //测试环境使用，正式环境需要设置静态资源代理
  // app.useStaticAssets(`static`, { prefix: '/static/' });
  await app.listen(process.env.PORT).then(() => console.log(`The server work on port ${process.env.PORT}`));
}
bootstrap();
