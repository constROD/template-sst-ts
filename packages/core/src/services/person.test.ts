import { mysqlConnection } from '@core/db/connections';
import { type DatabaseTables } from '@core/db/schemas';
import { describe, expect, it } from 'vitest';
import { list } from './person';

const db = mysqlConnection();

describe('person', () => {
  describe('list', () => {
    it('should return list of persons', async () => {
      const { records, totalRecords } = await list({ db });
      expect(records).toHaveLength(records.length);
      expect(totalRecords).toBeGreaterThanOrEqual(records.length);
    });

    it('should return specified number of persons', async () => {
      const count = 2;
      const { records } = await list({ db, count });
      expect(records).toHaveLength(count);
    });

    it('should return specific fields of persons', async () => {
      const fields: (keyof DatabaseTables['persons'])[] = ['id', 'first_name'];
      const { records } = await list({ db, fields });
      records.forEach(record => {
        expect(Object.keys(record)).toEqual(fields);
      });
    });

    it('should return sorted list of persons', async () => {
      const sortBy: keyof DatabaseTables['persons'] = 'first_name';
      const orderBy: 'asc' | 'desc' = 'asc';
      const { records } = await list({ db, sortBy, orderBy });
      const sortedRecords = [...records].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      expect(records).toEqual(sortedRecords);
    });
  });
});
