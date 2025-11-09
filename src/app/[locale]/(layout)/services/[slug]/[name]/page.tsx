"use client";

import { useStrapi } from "@/lib/useStrapi";
import { Service } from "@/types/service";
import { useParams } from "next/navigation";
import { Container } from "@/components/layouts/Container";
import RichTextRenderer from "@/components/global/RichTextRenderer";
import Link from "next/link";

export default function ServiceDetailsPage() {
  const params = useParams();
  const {
    data: services,
    isLoading,
    error,
  } = useStrapi("services", {
    populate: "*",
  });

  const serviceItem: Service | undefined = services?.data.find(
    (service: Service) => service.slug === params.name,
  );

  console.log(serviceItem);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading posts.</p>;

  if (!serviceItem) return <p>Service not found.</p>;

  return (
    <Container>
      <div key={serviceItem.id}>
        <h2 className="text-lg font-bold">{serviceItem.title}</h2>
        <p>{serviceItem.sub_title}</p>
        <p>{serviceItem.category.title}</p>
        <RichTextRenderer content={serviceItem.description} />
        <div>
          <p>تعداد جلسات: {serviceItem.sessions}</p>
          <p>روزهای برگزاری: {serviceItem.days}</p>
          <p>تاریخ شروع: {serviceItem.start_date}</p>
          <p>قیمت: {serviceItem.fee} یورو</p>
          <p>{serviceItem.payment_note}</p>
          <p>محل برگزاری: {serviceItem.address}</p>
          <p>{serviceItem.additional_note}</p>
        </div>
        <hr />
        مدرس دوره:
        <p>
          <Link href={`/artists/${serviceItem.artists[0].slug}`}>
            {serviceItem.artists[0].title}
          </Link>
        </p>
      </div>
    </Container>
  );
}
