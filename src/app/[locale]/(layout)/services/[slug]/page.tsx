"use client";

import { useStrapi } from "@/lib/useStrapi";
import { Service } from "@/types/service";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layouts/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category";

export default function ServicesPage() {
  const params = useParams();
  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useStrapi("services", {
    populate: "*",
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useStrapi("categories", {
    populate: "*",
  });

  const categoryTitle = categories?.data.find(
    (category: Category) => category.slug === params.slug,
  )?.title;

  const servicesItems: Service[] =
    services?.data.filter(
      (service: Service) => service.category.slug === params.slug,
    ) || [];

  if (servicesLoading || categoriesLoading) return <p>Loading...</p>;

  if (servicesError || categoriesError) return <p>Error loading posts.</p>;

  return (
    <Container>
      <h1 className="text-lg font-bold">لیست {categoryTitle}</h1>

      {servicesItems.length === 0 && <p>هیچ موردی در این دسته وجود ندارد.</p>}

      <div className="grid grid-cols-3 gap-4">
        {servicesItems.map((service) => (
          <Card key={service.id}>
            <CardContent>
              <h2 className="font-bold">{service.title}</h2>
              <p className="text-sm">{service.sub_title}</p>

              <Link
                href={`/services/${params.slug}/${service.slug}`}
                className="text-muted-foreground mt-3 flex"
              >
                مشاهده جزئیات
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
