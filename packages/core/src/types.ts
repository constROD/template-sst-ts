import { type Kysely } from 'kysely';
import { type DatabaseTables } from 'src/db/schema';

export type ServiceParam<TParam = undefined> = TParam extends undefined
  ? { db: Kysely<DatabaseTables> }
  : { db: Kysely<DatabaseTables> } & TParam;
