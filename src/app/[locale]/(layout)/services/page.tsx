import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ServicesPage from "./ServicesPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Services");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Page() {
  return <ServicesPage />;
}
