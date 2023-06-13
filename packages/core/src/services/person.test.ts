import { DEFAULT_DB_CONFIG } from '@core/constants/db';
import { mysqlConnection } from '@core/db/connections';
import { type DatabaseTables } from '@core/db/schemas';
import { describe, expect, it } from 'vitest';
import { PersonService } from './person';

const db = mysqlConnection(DEFAULT_DB_CONFIG);

describe('person', () => {
  describe('list', () => {
    it('should return list of persons', async () => {
      const { records, totalRecords } = await PersonService.list({ db });
      expect(records).toHaveLength(records.length);
      expect(totalRecords).toBeGreaterThanOrEqual(records.length);
    });

    it('should return specified number of persons', async () => {
      const count = 2;
      const { records } = await PersonService.list({ db, count });
      expect(records).toHaveLength(count);
    });

    it('should return specific fields of persons', async () => {
      const fields: (keyof DatabaseTables['persons'])[] = ['id', 'first_name'];
      const { records } = await PersonService.list({ db, fields });
      records.forEach(record => {
        expect(Object.keys(record)).toEqual(fields);
      });
    });

    it('should return sorted list of persons', async () => {
      const sortBy = 'first_name';
      const orderBy: 'asc' | 'desc' = 'asc';
      const { records } = await PersonService.list({ db, sortBy, orderBy });
      const sortedRecords = [...records].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      expect(records).toEqual(sortedRecords);
    });
  });
});
