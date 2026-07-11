import type { ObjectId } from 'mongodb';

export interface PropertyMetricDocument {
  _id?: ObjectId;
  propertyId: string;
  date: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
