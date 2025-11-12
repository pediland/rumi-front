"use client";

import { Link } from "@/i18n/navigation";
import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import * as PhosphorIcons from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { Loader } from "@/components/global/Loader";
import { Container } from "@/components/layouts/Container";
import { Header } from "@/components/layouts/Header";
import { PageHead } from "@/components/layouts/PageHead";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const locale = useLocale();
  const { setPageHead, resetPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead(t("title"), t("description"));
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, t]);

  const { data, isLoading, error } = useStrapi("categories");
  const categories: Category[] = data?.data || [];

  console.log(categories);

  const backgrounds = [
    {
      src: "/images/cat-bg-1.svg",
      color: "text-violet-500",
    },
    {
      src: "/images/cat-bg-2.svg",
      color: "text-rose-500",
    },
    {
      src: "/images/cat-bg-3.svg",
      color: "text-green-500",
    },
    {
      src: "/images/cat-bg-4.svg",
      color: "text-yellow-500",
    },
  ];

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <div className="flex flex-col border-b border-gray-100 bg-linear-to-t from-gray-50 to-gray-100 sm:h-60">
        <div className="flex flex-1 flex-col bg-[url('/images/mask-bg.webp')] bg-cover bg-center pt-4">
          <Header />

          <PageHead />
        </div>
      </div>
      <main>
        <Container className="py-10">
          <div className="flex justify-center gap-24">
            {categories
              .sort((a, b) => a.id - b.id)
              .map((category, index) => {
                const bg = backgrounds[index % backgrounds.length];
                const IconComponent =
                  (PhosphorIcons as any)[category.icon] ||
                  PhosphorIcons.PaletteIcon;

                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center gap-5"
                  >
                    <Link href={`/services/${category.slug}`}>
                      <div
                        className={`flex size-32 items-center justify-center rounded-full bg-cover bg-no-repeat ${bg.color}`}
                        style={{
                          backgroundImage: `url(${bg.src})`,
                        }}
                      >
                        <IconComponent size={44} weight="duotone" />
                      </div>
                    </Link>
                    <div className="flex flex-col items-center space-y-2.5">
                      <Link
                        href={`/services/${category.slug}`}
                        className={cn(
                          `flex items-center justify-center text-lg group-hover:text-blue-800`,
                        )}
                      >
                        {category.title}
                      </Link>
                      <div
                        className={cn(
                          "text-muted-foreground flex size-9 items-center justify-center rounded-full bg-gray-100 font-medium",
                          locale === "fa" && "pt-1",
                        )}
                      >
                        {category?.attributes?.servicesCount}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
      </main>
    </div>
  );
}
