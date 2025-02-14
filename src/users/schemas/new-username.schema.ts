import { z } from 'zod';
import { newUserSchema } from './new-user.schema';

export type NewUsername = z.infer<typeof newUsernameSchema>;
export const newUsernameSchema = z.object({
  username: newUserSchema.shape.username,
});
