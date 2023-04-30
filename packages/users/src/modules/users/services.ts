import { PGService } from '@lib/services';
import { connection } from '@lib/utils';
import { TABLES } from './constants';
import { type User } from './types';

export class UsersService extends PGService<User> {
  constructor() {
    super({ connection, tableName: TABLES.Users });
  }
}

export const usersService = new UsersService();
