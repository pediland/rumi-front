import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ArtistsPage } from "./ArtistsPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Artists");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Page() {
  return <ArtistsPage />;
}
