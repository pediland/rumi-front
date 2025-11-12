"use client";

import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Artist } from "@/types/artist";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Link } from "@/i18n/navigation";
import { Loader } from "@/components/global/Loader";
import { ErrorHint } from "@/components/global/ErrorHint";
import { Container } from "@/components/layouts/Container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Header } from "@/components/layouts/Header";
import { PageHead } from "@/components/layouts/PageHead";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ArtistsPage() {
  const t = useTranslations("Artists");
  const { data, isLoading, error } = useStrapi("artists", {
    populate: "*",
  });
  const { setPageHead, resetPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead(t("title"), t("description"));
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, t]);

  const artists: Artist[] = data?.data || [];

  console.log(artists);

  if (isLoading) return <Loader />;

  if (error) return <ErrorHint type="server" />;

  return (
    <div>
      <div className="flex flex-col border-b border-gray-100 bg-linear-to-t from-gray-50 to-gray-100 sm:h-60">
        <div className="flex flex-1 flex-col bg-[url('/images/mask-bg.webp')] bg-cover bg-center pt-4">
          <Header />

          <PageHead />
        </div>
      </div>

      <main>
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
    </div>
  );
}
