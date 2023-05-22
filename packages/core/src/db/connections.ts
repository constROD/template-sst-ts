import { Kysely, MysqlDialect, PostgresDialect } from 'kysely';
import { createPool, type PoolOptions } from 'mysql2';
import { Pool, type PoolConfig } from 'pg';
import { Config } from 'sst/node/config';
import { type DatabaseTables } from './schemas';

const defaultConfig = {
  host: Config.DB_HOST,
  port: Config.DB_PORT ? Number(Config.DB_PORT) : 3306,
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
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
