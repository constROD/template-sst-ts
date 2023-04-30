import { z } from 'zod';

const id = z.string().uuid();

export const getUserSchema = z.object({ id });

export const createUserSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
});
export const updateUserSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().trim().optional(),
  last_name: z.string().trim().optional(),
});
export const deleteUserSchema = z.object({ id });
export const archiveUserSchema = z.object({ id });
