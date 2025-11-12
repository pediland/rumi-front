export interface Artist {
  createdAt: string;
  documentId: string;
  id: number;
  locale: string;
  nationality: string;
  publishedAt: string;
  image: {
    url: string;
  };
  resume: [];
  slug: string;
  title: string;
  sub_title: string;
  intro_text: string;
  updatedAt: string;
}
