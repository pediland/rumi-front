import { Meta } from "./meta";
import { Category } from "./category";
import { Artist } from "./artist";

export interface ProgramResponse {
  data: Program[];
  meta: Meta;
}

export interface Program {
  additional_note: string;
  address: string;
  artist: Artist;
  capacity: number;
  category: Category;
  createdAt: string;
  days: string;
  description: [];
  documentId: string;
  id: number;
  image: { url: string };
  locale: string;
  price: number;
  publishedAt: string;
  sessions: number;
  slug: string;
  start_date: string;
  sub_title: string;
  title: string;
  updatedAt: string;
}
