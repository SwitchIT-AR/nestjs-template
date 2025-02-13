import { z } from 'zod';

export type NewUser = z.infer<typeof newUserSchema>;
export const newUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2)
    .max(32)
    .regex(/^[a-z0-9]*$/, { message: 'Must be alphanumeric' }),
  password: z.string().min(8).max(128),
});
