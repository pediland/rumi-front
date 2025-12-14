"use client";

import { Link } from "@/i18n/navigation";
import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Program } from "@/types/program";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Loader } from "@/components/global/Loader";
import { Container } from "@/components/layouts/Container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoriesFilter } from "./CategoriesFilter";

import backgroundImage from "@/assets/images/bg-programs-01.webp";
import placeholder from "@/assets/images/program-image.webp";

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
  }, [setPageHead]);

  const {
    data: programs,
    isLoading,
    error,
  } = useStrapi("programs", {
    populate: "*",
  });

  const programsItems: Program[] =
    selectedCategory === null
      ? programs?.data || []
      : programs?.data.filter(
          (program: Program) => program.category?.id === selectedCategory,
        ) || [];

  const noItems = programsItems.length === 0;

  if (isLoading) return <Loader />;

  if (error) return <p>خطایی رخ داده است.</p>;

  return (
    <main className="space-y-8 py-8">
      <CategoriesFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCategoryTitle={setCategoryTitle}
        noItems={noItems}
      />

      <Container>
        {noItems && (
          <p className="text-muted-foreground text-center">
            {categoryTitle !== ""
              ? t("noProgramsInCategory", { categoryTitle })
              : t("noPrograms")}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-4">
          {programsItems.map((program) => (
            <Card
              key={program.id}
              className="border-b-primary/50 gap-0 rounded-none border-b-5 p-0"
            >
              <CardHeader className="flex items-center justify-center p-0">
                <Image
                  src={program.image?.url || placeholder}
                  className="rounded-t-md"
                  width={370}
                  height={250}
                  alt={program.title}
                />
              </CardHeader>
              <CardContent className="space-y-2 p-5">
                <Badge variant="outline">{program.category?.title}</Badge>
                <h2 className="line-clamp-1 text-lg font-semibold">
                  {program.title}
                </h2>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button
                  asChild
                  className="bg-primary/90 hover:bg-primary w-full"
                >
                  <Link href={`/programs/${program.slug}`}>مشاهده جزئیات</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
