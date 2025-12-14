"use client";

import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Program } from "@/types/program";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { ErrorHint } from "@/components/global/ErrorHint";
import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesFilter } from "./CategoriesFilter";
import { ProgramCard } from "./ProgramCard";

import backgroundImage from "@/assets/images/bg-programs-01.webp";

export default function ProgramsPage() {
  const t = useTranslations("Programs");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const { setPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead({
      title: t("title"),
      backgroundImage: backgroundImage.src,
    });
  }, [setPageHead, t]);

  const {
    data: programs,
    isLoading,
    error,
  } = useStrapi("programs", {
    populate: "*",
  });

  const programsItems = useMemo(() => {
    if (!programs?.data) return [];
    if (selectedCategory === null) return programs.data;
    return programs.data.filter(
      (program: Program) => program.category?.id === selectedCategory,
    );
  }, [programs, selectedCategory]);

  const noItems = programsItems.length === 0;

  if (error) return <ErrorHint type="server" />;

  return (
    <main className="space-y-6 py-6">
      {!noItems && (
        <CategoriesFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setCategoryTitle={setCategoryTitle}
        />
      )}

      <Container>
        <div className="grid gap-5 sm:grid-cols-4">
          {isLoading && <ProgramsSkeleton />}

          {!isLoading &&
            programsItems.map((program: Program) => (
              <ProgramCard key={program.id} program={program} />
            ))}

          {noItems && !isLoading && (
            <p className="text-muted-foreground text-center">
              {categoryTitle !== ""
                ? t("noProgramsInCategory", { categoryTitle })
                : t("noPrograms")}
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}

function ProgramsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[20px] w-2/3" />
          <Skeleton className="h-[20px] w-1/3" />
          <Skeleton className="h-[20px] w-1/6" />
        </div>
      ))}
    </>
  );
}
