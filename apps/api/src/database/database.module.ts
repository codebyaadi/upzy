import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { closeAllDatabaseConnections, createDatabase } from '@upzy/db';
import { DatabaseService } from './database.service';
import { EnvType } from '../config/env.schema';
import { DB_PROVIDER } from './database.provider';

@Global()
@Module({
  providers: [
    {
      provide: DB_PROVIDER,
      useFactory: (configService: ConfigService<EnvType>) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error(
            'DATABASE_URL is not defined in NestJS configuration.',
          );
        }
        return createDatabase(databaseUrl);
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: ['DATABASE', DatabaseService],
})
export class DatabaseModule implements OnModuleDestroy {
  // This lifecycle hook is crucial for graceful shutdown of long-running processes
  async onModuleDestroy() {
    await closeAllDatabaseConnections();
  }
}
