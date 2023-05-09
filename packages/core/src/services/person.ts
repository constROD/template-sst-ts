import { type UpdateObject } from 'kysely';
import { type InsertObjectOrList } from 'kysely/dist/cjs/parser/insert-values-parser';
import { type DatabaseTables } from 'src/db/schema';
import { type ServiceParam } from 'src/types';

export async function get({ db, id }: ServiceParam<{ id: string }>) {
  const records = await db.selectFrom('persons').selectAll().where('id', '=', id).execute();
  return records;
}

export async function list({ db }: ServiceParam) {
  const records = await db.selectFrom('persons').selectAll().execute();
  const [data] = await db
    .selectFrom('persons')
    .select(db.fn.count('id').as('total_records'))
    .execute();
  return { records, totalRecords: data?.total_records ?? 0 };
}

export async function create({
  db,
  values,
}: ServiceParam<{ values: InsertObjectOrList<DatabaseTables, keyof DatabaseTables> }>) {
  const records = await db.insertInto('persons').values(values).returningAll().execute();
  return records;
}

export async function update({
  db,
  id,
  values,
}: ServiceParam<{ id: string; values: UpdateObject<DatabaseTables, keyof DatabaseTables> }>) {
  const records = await db
    .updateTable('persons')
    .set(values)
    .where('id', '=', id)
    .returningAll()
    .execute();
  return records;
}

export async function remove({ db, id }: ServiceParam<{ id: string }>) {
  const records = await db.deleteFrom('persons').where('id', 'in', id).returningAll().execute();
  return records;
}

export async function archive({ db, id }: ServiceParam<{ id: string }>) {
  const records = await db
    .updateTable('persons')
    .set({
      /* Add archived_at column here */
    })
    .where('id', '=', id)
    .returningAll()
    .execute();
  return records;
}
