import { z } from 'zod/v4';

export type LoginData = z.infer<typeof loginDataSchema>;
export const loginDataSchema = z.object({
  username: z.string().trim(),
  password: z.string(),
});
