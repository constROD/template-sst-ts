import { type DatabaseTables } from '@core/db/schemas';
import { type ServiceParam } from '@core/types/commons';
import { sql, type UpdateObject } from 'kysely';
import { type InsertObjectOrList } from 'kysely/dist/cjs/parser/insert-values-parser';

export * as PersonService from './person';

export async function get({ db, id }: ServiceParam<{ id: string }>) {
  const records = await db.selectFrom('persons').selectAll().where('id', '=', id).execute();
  return records;
}

export async function list({
  db,
  fields = [],
  page = 1,
  count = 100,
  sortBy = 'created_at',
  orderBy = 'asc',
}: ServiceParam<{
  fields?: (keyof DatabaseTables['persons'])[];
  page?: number;
  count?: number;
  sortBy?: keyof DatabaseTables['persons'];
  orderBy?: 'asc' | 'desc';
}>) {
  const query = db
    .selectFrom('persons')
    .limit(count)
    .offset((page - 1) * count)
    .orderBy(sortBy, orderBy);

  let records;

  if (fields.length) {
    records = await query.select(fields).execute();
  } else {
    records = await query.selectAll().execute();
  }

  const [data] = await db
    .selectFrom('persons')
    .select(db.fn.count('id').as('total_records'))
    .execute();

  return { records, totalRecords: data?.total_records ?? 0 };
}

export async function create({
  db,
  values,
}: ServiceParam<{
  values: InsertObjectOrList<DatabaseTables, 'persons'>;
}>) {
  await db.insertInto('persons').values(values).execute();
  return true;
}

export async function update({
  db,
  id,
  values,
}: ServiceParam<{
  id: string;
  values: UpdateObject<DatabaseTables, 'persons'>;
}>) {
  await db.updateTable('persons').set(values).where('id', '=', id).execute();
  return true;
}

export async function remove({ db, id }: ServiceParam<{ id: string }>) {
  await db.deleteFrom('persons').where('id', 'in', id).execute();
  return true;
}

export async function archive({ db, id }: ServiceParam<{ id: string }>) {
  await db
    .updateTable('persons')
    .set({ archived_at: sql`NOW()` })
    .where('id', '=', id)
    .execute();
  return true;
}
