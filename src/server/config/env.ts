import 'server-only';
import { z } from 'zod';
const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_DB_NAME: z.string().min(1).default('lyn_bactad_real_estate'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  PROPERTY_PAGE_SIZE: z.coerce.number().int().min(3).max(24).default(6),
});
let cached: z.infer<typeof envSchema> | undefined;
export function getEnv() { cached ??= envSchema.parse(process.env); return cached; }
