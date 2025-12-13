import { Meta } from "./meta";

export interface CategoryResponse {
  data: Category[];
  meta: Meta;
}

export interface Category {
  createdAt: string;
  documentId: string;
  icon: string;
  id: number;
  locale: string;
  programsCount: number;
  publishedAt: string;
  slug: string;
  sort: number;
  title: string;
  updatedAt: string;
}
