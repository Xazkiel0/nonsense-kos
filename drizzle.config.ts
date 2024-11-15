import 'dotenv/config';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config({ path: './.env.local' });
const STAGING_STATUS = process.env.STAGING_STATUS;

function check_staging() {
  if (!STAGING_STATUS) return;
  else {
    dotenv.config({ path: './.env' });
  }
}

console.log('BEFORE:', STAGING_STATUS);

check_staging();
console.log('AFTER:', STAGING_STATUS);

export default defineConfig({
  out: './drizzle-output',
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    database: process.env.POSTGRES_DATABASE,
  },
});
