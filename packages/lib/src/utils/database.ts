import knex, { type Knex } from 'knex';
import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => Number(value));

const connectionConfig: Partial<Knex.PgConnectionConfig> = {
  host: 'localhost',
  port: 5432,
  user: 'constrod',
  password: 'password',
};

const pool: Knex.Config['pool'] = { min: 1, max: 1 };

/**
 *
 * @param database a database name
 * @returns knex instance
 */

const connect = (database: string) =>
  knex({
    client: 'pg',
    connection: {
      ...connectionConfig,
      database,
    },
    pool,
  });

/**
 * Establishes a connection to the database.
 */
export const connection = connect('constrod');
