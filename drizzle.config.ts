import 'dotenv/config';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config({ path: './.env' });

export default defineConfig({
  out: './drizzle-output',
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    database: 'kos-app',
  },
});
