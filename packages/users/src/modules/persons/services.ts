import { type DatabaseTables } from '@core/db';
import { PGService } from '@core/services';
import { type Kysely } from 'kysely';

export class PersonService extends PGService<keyof DatabaseTables> {
  constructor(db: Kysely<DatabaseTables>) {
    super({ db, tableName: 'persons' });
  }
}
