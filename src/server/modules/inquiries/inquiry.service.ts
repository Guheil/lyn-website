import 'server-only';
import { createInquiry } from './inquiry.repository';
import { createInquirySchema } from './inquiry.schema';
export async function submitInquiry(input: unknown) { const value = createInquirySchema.parse(input); if (value.website) return { accepted: true }; const now = new Date(); const id = await createInquiry({ name: value.name, phone: value.phone, email: value.email, inquiryType: value.inquiryType, preferredPropertyType: value.preferredPropertyType, propertyReference: value.propertyReference, message: value.message, source: 'Website', status: 'new', assignedTo: null, followUpDate: null, privateNotes: '', createdAt: now, updatedAt: now }); return { accepted: true, id }; }
