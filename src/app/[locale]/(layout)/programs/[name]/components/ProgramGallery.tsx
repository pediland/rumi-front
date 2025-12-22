import { ImageType } from "@/types/gallery";
import Image from "next/image";

import { Container } from "@/components/layouts/Container";
interface ProgramGalleryProps {
  gallery: ImageType[];
}

export const ProgramGallery = ({ gallery }: ProgramGalleryProps) => {
  if (!gallery || gallery.length === 0) return null;

  const [coverImage, ...thumbnails] = gallery;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 overflow-hidden">
        <div
          className="col-span-3 aspect-square rounded-lg bg-cover bg-center sm:col-span-2 sm:aspect-auto"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        />

        <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-4 sm:col-span-1">
          {thumbnails.map((item, index) => (
            <Image
              key={item.id ?? index}
              src={item.url}
              className="aspect-square rounded-lg object-cover"
              alt={item.alternativeText ?? ""}
              width={400}
              height={400}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};
