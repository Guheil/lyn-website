import { z } from 'zod';
export const publicPropertyQuerySchema = z.object({ page: z.coerce.number().int().positive().default(1), type: z.string().trim().max(80).optional() }).strict();
export const propertySlugSchema = z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
