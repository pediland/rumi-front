"use client";

import { Link } from "@/i18n/navigation";
import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Artist } from "@/types/artist";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

import { ErrorHint } from "@/components/global/ErrorHint";
import { Loader } from "@/components/global/Loader";
import { Container } from "@/components/layouts/Container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Button } from "@/components/ui/button";

import backgroundImage from "@/assets/images/bg-artists-01.webp";

export function ArtistsPage() {
  const t = useTranslations("Artists");

  const { setPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead({
      title: t("title"),
      backgroundImage: backgroundImage.src,
    });
  }, [setPageHead]);

  const { data, isLoading, error } = useStrapi("artists", {
    populate: "*",
  });

  const artists: Artist[] = data?.data || [];

  console.log(artists);

  if (isLoading) return <Loader />;

  if (error) return <ErrorHint type="server" />;

  return (
    <main className="space-y-8 py-8">
      <Container>
        <div className="grid grid-cols-5">
          {artists.map((artist) => (
            <Card key={artist.id} className="gap-0 p-0">
              <CardHeader className="gap-0 p-0">
                <Image
                  src={artist.image?.url}
                  alt={artist.title}
                  width={270}
                  height={320}
                />
              </CardHeader>
              <CardContent className="p-4 text-center">
                <h2 className="text-primary font-bold">{artist.title}</h2>
                <p className="text-muted-foreground text-sm">
                  {artist.sub_title}
                </p>
              </CardContent>
              <CardFooter className="justify-center p-4 pt-0">
                <Button className="px-4" size="sm" asChild>
                  <Link href={`/artists/${artist.slug}`}>مشاهده جزئیات</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
