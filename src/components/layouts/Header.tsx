"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { Container, SelectLanguage } from "@/components";

export const Header = () => {
  const t = useTranslations("Menu");

  return (
    <header className="pt-5">
      <Container className="py-0">
        <div className="flex h-14 items-center justify-center">
          <Link href={`/`}>
            <h1 className="text-lg font-bold uppercase">Expat Kulturhaus</h1>
          </Link>
          <div className="flex flex-1 justify-end gap-16">
            <nav className="flex gap-10 font-medium">
              <Link href={`/`}>{t("Home")}</Link>
              <Link href={`/services`}>{t("Services")}</Link>
              <Link href={`/artists`}>{t("Artists")}</Link>
              <Link href={`/contact`}>{t("Contact")}</Link>
            </nav>

            <SelectLanguage />
          </div>
        </div>
      </Container>
    </header>
  );
};
