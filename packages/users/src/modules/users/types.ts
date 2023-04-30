import { type z } from 'zod';
import { type createUserSchema, type updateUserSchema } from './validations';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
}

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
