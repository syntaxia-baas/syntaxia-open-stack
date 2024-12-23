import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
export default defineConfig({
  schema: './src/drizzle/schema/**.schema.ts',
  dialect: 'postgresql',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
