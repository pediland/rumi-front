"use client";

import { cn } from "@/lib/utils";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

import { Container } from "@/components/layouts/Container";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const { resetPageHead } = usePageHeadStore();

  useEffect(() => {
    resetPageHead();
  }, []);

  return (
    <main>
      <div className="mask-repeat-no-repeat flex flex-col bg-[url('/images/bg-hero.svg')] mask-[url('/images/mask-hero.webp')] bg-cover mask-cover mask-right sm:h-[95vh]">
        <div className="flex flex-1 flex-col bg-[url('/images/mask-bg.webp')] pt-4">
          <div className="flex flex-1 gap-10">
            <Container className="py-0">
              <div className="grid h-full grid-cols-2 items-center gap-10">
                <div>
                  <h1
                    className={cn(
                      "text-5xl text-violet-800",
                      locale === "fa"
                        ? "font-lalezar"
                        : "font-ubuntu leading-tight font-medium",
                    )}
                  >
                    {t("title")}
                  </h1>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="flex h-[500px] w-[500px] rounded-full bg-gray-200/70"></div>
                  <div className="absolute rounded-md bg-white p-5 shadow-lg">
                    <Image
                      src="/images/girl-with-brushes.webp"
                      alt="hero"
                      width={380}
                      height={380}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
}
