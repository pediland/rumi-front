"use client";

import { useStrapi } from "@/lib/useStrapi";
import { useParams } from "next/navigation";
import { Container } from "@/components/layouts/Container";
import { Artist } from "@/types/artist";
import RichTextRenderer from "@/components/global/RichTextRenderer";
import { Header } from "@/components/layouts/Header";
import Image from "next/image";

export default function ArtistDetailsPage() {
  const params = useParams();
  const {
    data: artists,
    isLoading,
    error,
  } = useStrapi("artists", {
    populate: "*",
  });

  const artistItem: Artist | undefined = artists?.data.find(
    (artist: Artist) => artist.slug === params.slug,
  );

  console.log(artistItem);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading artist.</p>;

  if (!artistItem) return <p>Artist not found.</p>;

  return (
    <main className="pb-10">
      <div className="bg-linear-to-t from-white to-violet-100">
        <Header className="pt-4" />

        <Container>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-1 space-y-3">
              <div>
                <Image
                  src={artistItem.image.url}
                  className="rounded"
                  alt={artistItem.title}
                  width={270}
                  height={320}
                />
              </div>
              <div className="text-center">
                <h2 className="text-primary text-lg font-semibold">
                  {artistItem.title}
                </h2>
                <p>ملیت: {artistItem.nationality}</p>
              </div>
            </div>
            <div className="col-span-4">
              <RichTextRenderer content={artistItem.resume} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
