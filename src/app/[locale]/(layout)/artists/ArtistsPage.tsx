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
import { Card, CardContent } from "@/components/ui";

export function ArtistsPage() {
  const t = useTranslations("Artists");
  const { data, isLoading, error } = useStrapi("artists");
  const { setPageHead, resetPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead(t("title"), t("description"));
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, t]);

  const artists: Artist[] = data?.data || [];

  if (isLoading) return <Loader />;

  if (error) return <ErrorHint type="server" />;

  return (
    <Container>
      <div className="grid grid-cols-4">
        {artists.map((artist) => (
          <Card key={artist.id}>
            <CardContent>
              <h2 className="font-bold">{artist.title}</h2>

              <Link
                className="text-muted-foreground text-sm font-medium"
                href={`/artists/${artist.slug}`}
              >
                مشاهده جزئیات
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
