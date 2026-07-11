import { z } from 'zod';
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const HTML = /[<>]/;
export function plainText(field: string, min: number, max: number) { return z.string().transform((value) => value.normalize('NFKC').trim()).pipe(z.string().min(min).max(max)).refine((value) => !CONTROL.test(value), `${field} contains invalid characters.`).refine((value) => !HTML.test(value), `${field} must be plain text.`); }
