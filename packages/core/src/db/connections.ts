import { Kysely, MysqlDialect, PostgresDialect } from 'kysely';
import { createPool, type PoolOptions } from 'mysql2';
import { Pool, type PoolConfig } from 'pg';
import { type DatabaseTables } from './schemas';

/* Change this to Secrets Values */
const defaultConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'constrod',
};

export function pgConnection(config?: PoolConfig) {
  return new Kysely<DatabaseTables>({
    dialect: new PostgresDialect({
      pool: new Pool(config ? { ...defaultConfig, ...config } : defaultConfig),
    }),
  });
}

export function mysqlConnection(config?: PoolOptions) {
  return new Kysely<DatabaseTables>({
    dialect: new MysqlDialect({
      pool: createPool(config ? { ...defaultConfig, ...config } : defaultConfig),
    }),
  });
}
