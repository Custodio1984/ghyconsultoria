
import { Client } from 'pg';

export async function query(sql, params) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const result = await client.query(sql, params);
  await client.end();

  return result;
}
