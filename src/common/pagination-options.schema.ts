import { z } from 'zod';

export type PaginationOptions = z.infer<typeof paginationOptionsSchema>;
export const paginationOptionsSchema = z
  .object({
    page: z.coerce.number().int().gte(1).optional().default(1).catch(1),
    limit: z.coerce.number().int().gte(1).optional().default(20).catch(20),
  })
  .transform((values) => ({
    ...values,
    offset: (values.page - 1) * values.page,
  }));
