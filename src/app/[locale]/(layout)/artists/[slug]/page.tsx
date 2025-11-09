"use client";

import { useStrapi } from "@/lib/useStrapi";
import { useParams } from "next/navigation";
import { Container } from "@/components/layouts/Container";
import { Artist } from "@/types/artist";
import RichTextRenderer from "@/components/global/RichTextRenderer";

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
    <Container>
      <div key={artistItem.id}>
        <h2 className="text-lg font-bold">{artistItem.title}</h2>
        <p>ملیت: {artistItem.nationality}</p>
        <RichTextRenderer content={artistItem.resume} />
      </div>
    </Container>
  );
}
