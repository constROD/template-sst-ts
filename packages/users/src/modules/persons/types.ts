import { type z } from 'zod';
import { type createPersonSchema, type updatePersonSchema } from './validations';

export type CreatePerson = z.infer<typeof createPersonSchema>;
export type UpdatePerson = z.infer<typeof updatePersonSchema>;
