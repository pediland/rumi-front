"use client";

import { useStrapi } from "@/lib/useStrapi";
import { Category } from "@/types/category";

import { Container } from "@/components/layouts/Container";

export const CategoriesFilter = ({
  setSelectedCategory,
  setCategoryTitle,
}: {
  setSelectedCategory: (category: number | null) => void;
  setCategoryTitle: (title: string) => void;
}) => {
  const { data: categories, error } = useStrapi("categories", {
    populate: "*",
  });

  if (error) return <p>خطایی رخ داده است.</p>;

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div
          className="flex h-10 cursor-pointer items-center justify-center rounded-full border-2 px-4 font-medium shadow-[1px_1px_10px_0] shadow-black/10"
          onClick={() => {
            setSelectedCategory(null);
            setCategoryTitle("");
          }}
        >
          همه
        </div>
        {categories?.data
          ?.filter((category: Category) => category.programsCount > 0)
          .sort((a: Category, b: Category) => a.sort - b.sort)
          .map((category: Category) => (
            <div
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCategoryTitle(category.title);
              }}
              className="text-muted-foreground flex h-10 cursor-pointer items-center justify-center rounded-full border-2 px-4 font-medium shadow-[1px_1px_10px_0] shadow-black/10"
            >
              {category.title}
            </div>
          ))}
      </div>
    </Container>
  );
};
