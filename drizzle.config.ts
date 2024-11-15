import 'dotenv/config';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config({ path: './.env.local' });

export default defineConfig({
  out: './drizzle-output',
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // host: 'localhost',
    // port: 5432,
    // user: 'postgres',
    url: process.env.POSTGRES_URL!,
    // database: 'props_app',
  },
});
