"use client";

import { Link } from "@/i18n/navigation";
import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Container } from "@/components";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const { setPageHead, resetPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead(t("title"), t("description"));
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, t]);

  const { data, isLoading, error } = useStrapi("categories");
  const categories: Category[] = data?.data || [];

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading posts.</p>;

  return (
    <Container>
      <div className="grid grid-cols-4">
        {categories.map((category) => (
          <div key={category.id}>
            <Link href={`/services/${category.slug}`}>{category.title}</Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
