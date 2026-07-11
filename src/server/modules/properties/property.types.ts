import type { ObjectId } from 'mongodb';

export type PropertyPublishingStatus = 'draft' | 'review' | 'published';

export interface PropertyBrokerDocument {
  name: string;
  role?: string;
  agency?: string;
  mobile?: string;
  email?: string;
  whatsappUrl?: string;
  facebookUrl?: string;
  serviceArea?: string;
  isPlaceholder?: boolean;
}

export interface PublicPropertyBroker {
  name: string;
  role: string;
  agency: string;
  mobile: string;
  email: string;
  whatsappUrl: string;
  facebookUrl: string;
  serviceArea: string;
  isPlaceholder: boolean;
}

export interface PropertyDocument {
  _id?: ObjectId;
  title: string;
  slug: string;
  propertyType: string;
  status: PropertyPublishingStatus;
  location: string;
  price: string;
  lotArea: string;
  floorArea: string;
  shortDescription: string;
  features: string[];
  images: string[];
  broker?: PropertyBrokerDocument | null;
  isFeatured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicProperty {
  id: string;
  title: string;
  slug: string;
  propertyType: string;
  location: string;
  price: string;
  lotArea: string;
  floorArea: string;
  shortDescription: string;
  features: string[];
  images: string[];
  broker: PublicPropertyBroker | null;
  isFeatured: boolean;
  publishedAt: string | null;
}

export interface PropertyListResult {
  items: PublicProperty[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
