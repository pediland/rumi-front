"use client";

import { useStrapi } from "@/lib/useStrapi";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { Program } from "@/types/program";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Loader } from "@/components/global/Loader";
import { Container } from "@/components/layouts/Container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { CategoriesFilter } from "./CategoriesFilter";

import backgroundImage from "@/assets/images/bg-programs-01.webp";
import placeholder from "@/assets/images/program-image.webp";

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const { setPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead({
      title: "بـرنـامـه‌هـا",
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

  if (isLoading) return <Loader />;

  if (error) return <p>خطایی رخ داده است.</p>;

  return (
    <main className="space-y-8 py-8">
      <CategoriesFilter
        setSelectedCategory={setSelectedCategory}
        setCategoryTitle={setCategoryTitle}
      />

      <Container>
        {programsItems.length === 0 && (
          <p>
            {categoryTitle !== ""
              ? `هیچ برنامه‌ای در دسته ${categoryTitle} وجود ندارد.`
              : "هیچ برنامه‌ای وجود ندارد."}
          </p>
        )}

        <div className="grid grid-cols-4 gap-4">
          {programsItems.map((program) => (
            <Card
              key={program.id}
              className="border-b-primary/50 gap-0 border-b-5 p-0"
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
                <div>{program.category?.title}</div>
                <h2 className="text-lg font-semibold">{program.title}</h2>
                <p className="text-muted-foreground text-[15px]">
                  {program.sub_title}
                </p>
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
