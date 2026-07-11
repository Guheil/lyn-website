import type { ObjectId } from 'mongodb';
export interface InquiryDocument { _id?: ObjectId; name: string; phone: string; email: string; inquiryType: string; preferredPropertyType: string; propertyReference: string; message: string; source: 'Website'; status: 'new'; assignedTo: null; followUpDate: null; privateNotes: string; createdAt: Date; updatedAt: Date; }
