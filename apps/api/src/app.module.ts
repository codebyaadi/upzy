import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
