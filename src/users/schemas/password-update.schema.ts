import { z } from 'zod/v4';
import { newUserSchema } from './new-user.schema';

export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>;
export const passwordUpdateSchema = newUserSchema.pick({ password: true });
