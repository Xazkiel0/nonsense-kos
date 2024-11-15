import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('POSTGRES_URL');
      const pool = new Pool({
        ssl: false,
        connectionString,
      });

      return drizzle(pool, { schema });
    },
  },
];
