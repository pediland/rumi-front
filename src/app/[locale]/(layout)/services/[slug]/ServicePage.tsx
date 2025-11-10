"use client";

import { useStrapi } from "@/lib/useStrapi";
import { Service } from "@/types/service";
import { useParams } from "next/navigation";
import { Container } from "@/components/layouts/Container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Category } from "@/types/category";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Loader } from "@/components/global/Loader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function ServicePage() {
  const t = useTranslations("Service");
  const params = useParams();
  const { setPageHead, resetPageHead } = usePageHeadStore();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useStrapi("categories", {
    populate: "*",
  });

  useEffect(() => {
    const categoryTitle = categories?.data.find(
      (category: Category) => category.slug === params.slug,
    )?.title;

    setPageHead(`لیست ${categoryTitle || "..."}`, "");
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, categories]);

  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useStrapi("services", {
    populate: "*",
  });

  const servicesItems: Service[] =
    services?.data.filter(
      (service: Service) => service.category.slug === params.slug,
    ) || [];

  if (servicesLoading || categoriesLoading) return <Loader />;

  if (servicesError || categoriesError) return <p>Error loading posts.</p>;

  return (
    <Container>
      <h1 className="text-lg font-bold"></h1>

      {servicesItems.length === 0 && <p>هیچ موردی در این دسته وجود ندارد.</p>}

      <div className="grid grid-cols-4 gap-4">
        {servicesItems.map((service) => (
          <Card
            key={service.id}
            className="gap-0 rounded-md border-b-5 border-b-violet-200 p-0"
          >
            <CardHeader className="flex items-center justify-center p-0">
              <Image
                src={`${API_URL}${service.image.url}`}
                className="rounded-t-md"
                width={370}
                height={250}
                alt={service.title}
              />
            </CardHeader>
            <CardContent className="space-y-2 p-5">
              <h2 className="text-lg font-bold">{service.title}</h2>
              <p className="text-muted-foreground text-[15px]">
                {service.sub_title}
              </p>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button
                asChild
                className="w-full bg-violet-500/85 hover:bg-violet-500"
              >
                <Link href={`/services/${params.slug}/${service.slug}`}>
                  مشاهده جزئیات
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}
