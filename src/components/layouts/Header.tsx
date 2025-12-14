"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SelectLanguage } from "@/components/global/SelectLanguage";
import { Container } from "./Container";

import logo from "@/assets/images/logo.png";
import logoDark from "@/assets/images/logo-dark.png";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const t = useTranslations("Menu");
  const { title, backgroundImage } = usePageHeadStore();
  const imageStyle = !!backgroundImage;

  return (
    <header
      className={cn(
        className,
        imageStyle &&
          "relative flex min-h-[360px] flex-col bg-cover bg-center bg-no-repeat",
      )}
      {...(imageStyle && {
        style: { backgroundImage: `url(${backgroundImage})` },
      })}
    >
      {imageStyle && (
        <div className="absolute inset-0 h-full bg-radial from-transparent to-black/70"></div>
      )}

      <div
        className={cn(
          "flex items-center justify-center",
          imageStyle ? "z-10 h-20" : "h-[70px]",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            <Link href={`/`}>
              <Image
                src={imageStyle ? logo : logoDark}
                alt="Rumi Haus"
                width={150}
                height={60}
              />
            </Link>
            <div className="flex flex-1 justify-end gap-10">
              <nav
                className={cn(
                  "flex gap-10 font-medium",
                  imageStyle && "text-white",
                )}
              >
                <Link href={`/`}>{t("Home")}</Link>
                <Link href={`/programs`}>{t("Programs")}</Link>
                <Link href={`/artists`}>{t("Artists")}</Link>
                <Link href={`/contact`}>{t("Contact")}</Link>
              </nav>

              <SelectLanguage imageStyle={imageStyle} />
            </div>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "flex flex-1 items-center justify-center",
          imageStyle && "z-10",
        )}
      >
        {title && (
          <h1
            className={cn(
              "text-4xl font-bold drop-shadow-md drop-shadow-black",
              imageStyle && "text-white",
            )}
          >
            {title}
          </h1>
        )}
      </div>
    </header>
  );
};
