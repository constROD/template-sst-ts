import { type persons } from '@prisma/client';
import { type ColumnType, type Generated } from 'kysely';

type OverrideCommonField<T> = Omit<T, 'id' | 'created_at' | 'updated_at'> & {
  id: Generated<string>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};

export interface DatabaseTables {
  persons: OverrideCommonField<persons>;
}
