import { z } from 'zod';

const id = z.string().uuid();

export const getPersonSchema = z.object({ id });

export const createPersonSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
});
export const updatePersonSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().trim().optional(),
  last_name: z.string().trim().optional(),
});
export const deletePersonSchema = z.object({ id });
export const archivePersonSchema = z.object({ id });
