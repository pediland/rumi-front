import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ProgramsPage from "./components/ProgramsPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Programs");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Page() {
  return <ProgramsPage />;
}
