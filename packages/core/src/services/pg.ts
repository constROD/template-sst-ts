import { type Kysely, type UpdateObject } from 'kysely';
import { type InsertObjectOrList } from 'kysely/dist/cjs/parser/insert-values-parser';
import { type DatabaseTables } from '../db';

export class PGService<TTableName extends keyof DatabaseTables> {
  protected db: Kysely<DatabaseTables>;

  protected tableName: keyof DatabaseTables;

  constructor({ db, tableName }: { db: Kysely<DatabaseTables>; tableName: TTableName }) {
    this.db = db;
    this.tableName = tableName;
  }

  async get(id: string) {
    const records = await this.db
      .selectFrom(this.tableName)
      .selectAll()
      .where('id', '=', id)
      .execute();
    return records;
  }

  async list() {
    const records = await this.db.selectFrom(this.tableName).selectAll().execute();
    const [data] = await this.db
      .selectFrom(this.tableName)
      .select(this.db.fn.count('id').as('total_records'))
      .execute();
    return { records, totalRecords: data?.total_records ?? 0 };
  }

  async create(values: InsertObjectOrList<DatabaseTables, keyof DatabaseTables>) {
    const records = await this.db
      .insertInto(this.tableName)
      .values(values)
      .returningAll()
      .execute();
    return records;
  }

  async update(
    id: string,
    values: UpdateObject<DatabaseTables, keyof DatabaseTables, keyof DatabaseTables>
  ) {
    const records = await this.db
      .updateTable(this.tableName)
      .set(values)
      .where('id', '=', id)
      .returningAll()
      .execute();
    return records;
  }

  async delete(id: string) {
    const records = await this.db
      .deleteFrom(this.tableName)
      .where('id', 'in', id)
      .returningAll()
      .execute();
    return records;
  }

  async archive(id: string) {
    const records = await this.db
      .updateTable(this.tableName)
      .set({
        /* Add archived_at column here */
      })
      .where('id', '=', id)
      .returningAll()
      .execute();
    return records;
  }
}
