import { Kysely, MysqlDialect, PostgresDialect } from 'kysely';
import { createPool, type PoolOptions } from 'mysql2';
import { Pool, type PoolConfig } from 'pg';
import { type DatabaseTables } from './schemas';

export function pgConnection(config: PoolConfig) {
  return new Kysely<DatabaseTables>({
    dialect: new PostgresDialect({
      pool: new Pool(config),
    }),
  });
}

export function mysqlConnection(config: PoolOptions) {
  return new Kysely<DatabaseTables>({
    dialect: new MysqlDialect({
      pool: createPool(config),
    }),
  });
}
