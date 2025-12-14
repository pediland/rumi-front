import { Container } from "@/components/layouts/Container";
import { ImageType } from "@/types/gallery";
import Image from "next/image";

interface ProgramGalleryProps {
  gallery: ImageType[];
}

export const ProgramGallery = ({ gallery }: ProgramGalleryProps) => {
  if (!gallery || gallery.length === 0) return null;

  const [coverImage, ...thumbnails] = gallery;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 overflow-hidden">
        {/* تصویر اصلی */}
        <div
          className="col-span-2 rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        />

        {/* بقیه تصاویر (بدون index 0) */}
        <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-4">
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
