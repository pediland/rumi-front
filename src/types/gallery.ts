export interface ImageType {
  alternativeText: string;
  caption: string;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    large: {
      ext: string;
      height: number;
      size: number;
      url: string;
      width: number;
    };
    small: {
      ext: string;
      height: number;
      size: number;
      url: string;
      width: number;
    };
    medium: {
      ext: string;
      height: number;
      size: number;
      url: string;
      width: number;
    };
    thumbnail: {
      ext: string;
      height: number;
      size: number;
      url: string;
      width: number;
    };
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}
