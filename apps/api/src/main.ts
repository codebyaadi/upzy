import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { EnvType } from './config/env.schema';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, trustProxy: true }),
  );

  const configService = app.get(ConfigService<EnvType>);

  app.enableCors({
    origin: [configService.get('NEXT_PUBLIC_BASE_URL')].filter(
      Boolean,
    ) as string[],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
  });
  await app.listen(Number(configService.get('PORT')) ?? 8000);
}
bootstrap();
