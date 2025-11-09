import { Meta } from "./meta";

export interface CategoryResponse {
  data: Category[];
  meta: Meta;
}

export interface Category {
  id: number;
  documentId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
}
