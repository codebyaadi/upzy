import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabase } from '@upzy/db';
import { DatabaseService } from './database.service';
import { EnvType } from '../config/env.schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: (configService: ConfigService<EnvType>) => {
        // const { createDatabase } = require('@upzy/db');
        return createDatabase(configService.get('DATABASE_URL') || '');
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: ['DATABASE', DatabaseService],
})
export class DatabaseModule {}
