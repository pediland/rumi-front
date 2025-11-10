import { Meta } from "./meta";

export interface CategoryResponse {
  data: Category[];
  meta: Meta;
}

export interface Category {
  attributes: {
    servicesCount: number;
  };
  createdAt: string;
  documentId: string;
  icon: string;
  id: number;
  locale: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
}
