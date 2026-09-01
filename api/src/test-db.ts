import { pool } from './db.js';

console.log('Attempting query...');

const result = await pool.query('SELECT NOW()');

console.log('Success:', result.rows);

await pool.end();
