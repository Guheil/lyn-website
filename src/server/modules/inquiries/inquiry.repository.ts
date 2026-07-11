import 'server-only';
import { getInquiriesCollection } from '@/server/database';
import type { InquiryDocument } from './inquiry.types';
export async function createInquiry(document: InquiryDocument) { const result = await (await getInquiriesCollection()).insertOne(document); return result.insertedId.toHexString(); }
