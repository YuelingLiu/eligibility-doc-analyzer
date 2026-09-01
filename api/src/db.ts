import { Pool } from 'pg';
import 'dotenv/config';

console.log('DB config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000, // close idle connections after 30s, forcing fresh ones when needed
});
pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
  // pg automatically removes the broken client from the pool here —
  // the NEXT query will open a fresh connection automatically
});
