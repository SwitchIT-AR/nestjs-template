import { z } from 'zod/v4';
import { Role } from '../entities/role.enum';

export type NewUser = z.infer<typeof newUserSchema>;
export const newUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2)
    .max(32)
    .regex(/^[a-z0-9._-]*$/),
  password: z.string().min(8).max(128),
  role: z.enum(Role),
});
