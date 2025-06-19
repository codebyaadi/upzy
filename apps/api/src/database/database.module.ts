import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE',
      useFactory: (configService: ConfigService) => {
        const { createDatabase } = require('@upzy/db');
        return createDatabase(configService.get<string>('DATABASE_URL'));
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: ['DATABASE', DatabaseService],
})
export class DatabaseModule {}
