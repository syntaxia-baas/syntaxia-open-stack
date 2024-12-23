import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
export const db = drizzle(pool) as NodePgDatabase<typeof schema>;
