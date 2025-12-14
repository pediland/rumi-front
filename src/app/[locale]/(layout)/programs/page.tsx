import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ProgramsPage from "./components/ProgramsPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: `${t("programsMetaTitle")} | ${t("rumiHausMetaTitle")}`,
  };
}

export default function Page() {
  return <ProgramsPage />;
}
