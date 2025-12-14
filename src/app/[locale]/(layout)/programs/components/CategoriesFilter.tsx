"use client";

import { useStrapi } from "@/lib/useStrapi";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import { Container } from "@/components/layouts/Container";
import { ErrorHint } from "@/components/global/ErrorHint";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoriesFilter = ({
  selectedCategory,
  setSelectedCategory,
  setCategoryTitle,
}: {
  selectedCategory: number | null;
  setSelectedCategory: (category: number | null) => void;
  setCategoryTitle: (title: string) => void;
}) => {
  const t = useTranslations("Programs");

  const {
    data: categories,
    isLoading,
    error,
  } = useStrapi("categories", {
    populate: "*",
  });

  if (error) return <ErrorHint type="server" />;

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div
          className={cn(
            "flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 text-[15px]",
            selectedCategory === null
              ? "border-primary bg-primary text-primary-foreground"
              : "text-muted-foreground",
          )}
          onClick={() => {
            setSelectedCategory(null);
            setCategoryTitle("");
          }}
        >
          {t("all")}
        </div>

        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-18" />
            ))
          : categories?.data
              ?.filter((category: Category) => category.programsCount > 0)
              .sort((a: Category, b: Category) => a.sort - b.sort)
              .map((category: Category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCategoryTitle(category.title);
                  }}
                  className={cn(
                    "flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 text-[15px]",
                    selectedCategory === category.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {category.title}
                </div>
              ))}
      </div>
    </Container>
  );
};
