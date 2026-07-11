import 'server-only';

import { publicPropertyService } from '@/server/modules/properties';
import { createInquiry } from './inquiry.repository';
import { createInquirySchema } from './inquiry.schema';

export async function submitInquiry(input: unknown) {
  const value = createInquirySchema.parse(input);
  if (value.website) return { accepted: true };

  let propertyId = '';
  let propertySlug = '';
  let propertyName = value.propertyReference;
  let assignedBrokerId = '';
  let assignedTo = '';

  if (value.propertySlug) {
    try {
      const property = await publicPropertyService.getBySlug(value.propertySlug);
      if (property) {
        propertyId = property.id;
        propertySlug = property.slug;
        propertyName = property.title;
        assignedBrokerId = property.assignedBrokerId;
        assignedTo = property.broker?.name ?? '';
      }
    } catch {
      // Treat an invalid or outdated property link as a general inquiry.
    }
  }

  const now = new Date();
  const id = await createInquiry({
    name: value.name,
    phone: value.phone,
    email: value.email,
    inquiryType: value.inquiryType,
    preferredPropertyType: value.preferredPropertyType,
    propertyReference: propertyName || value.propertyReference,
    propertyId,
    propertySlug,
    propertyName,
    message: value.message,
    source: 'Website',
    status: 'new',
    assignedTo,
    assignedBrokerId,
    followUpDate: '',
    privateNotes: '',
    createdAt: now,
    updatedAt: now,
  });
  return { accepted: true, id };
}
