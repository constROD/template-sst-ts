import { type Kysely } from 'kysely';

import { type DatabaseTables } from '../db/schemas';

export type ServiceParam<TParam = undefined> = TParam extends undefined
  ? { db: Kysely<DatabaseTables> }
  : { db: Kysely<DatabaseTables> } & TParam;
