import { z } from 'zod';
import { newUserSchema } from './new-user.schema';

export type NewPassword = z.infer<typeof newPasswordSchema>;
export const newPasswordSchema = z.object({
  password: newUserSchema.shape.password,
});
