import { Kysely, PostgresDialect } from 'kysely';
import { Pool, type PoolConfig } from 'pg';
import { type DatabaseTables } from './schema';

/* Change this to Secrets Values */
const defaultConfig: PoolConfig = {
  host: 'localhost',
  port: 5432,
  password: 'password',
  database: 'constrod',
};

export function connection(config?: PoolConfig) {
  return new Kysely<DatabaseTables>({
    dialect: new PostgresDialect({
      pool: new Pool(config ? { ...defaultConfig, ...config } : defaultConfig),
    }),
  });
}
