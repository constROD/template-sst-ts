import { type DatabaseTables } from '@core/db';
import { PGService } from '@core/services';
import { type Connection } from 'src/db';

export class PersonService extends PGService<keyof DatabaseTables> {
  constructor(db: Connection) {
    super({ db, tableName: 'persons' });
  }
}
