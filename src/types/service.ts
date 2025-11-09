import { Meta } from "./meta";
import { Category } from "./category";
import { Artist } from "./artist";

export interface ServiceResponse {
  data: Service[];
  meta: Meta;
}

export interface Service {
  address: string;
  artists: Artist[];
  additional_note: string;
  category: Category;
  createdAt: string;
  days: string;
  description: [];
  documentId: string;
  fee: number;
  id: number;
  locale: string;
  payment_note: string;
  publishedAt: string;
  sessions: number;
  slug: string;
  start_date: string;
  sub_title: string;
  title: string;
  updatedAt: string;
}
