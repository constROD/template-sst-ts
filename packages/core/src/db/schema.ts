import { type ColumnType, type Generated } from 'kysely';

interface PersonTable {
  id: Generated<string>;
  first_name: string;
  last_name: string | null;
  archived_at: ColumnType<Date | null, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface DatabaseTables {
  persons: PersonTable;
}
