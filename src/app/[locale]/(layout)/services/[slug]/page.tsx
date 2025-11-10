import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ServicePage from "./ServicePage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Service");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Page() {
  return <ServicePage />;
}
