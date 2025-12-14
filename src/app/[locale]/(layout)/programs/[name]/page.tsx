"use client";

import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useEffect } from "react";
import { Program } from "@/types/program";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useStrapi } from "@/lib/useStrapi";

import { Loader } from "@/components/global/Loader";
import RichTextRenderer from "@/components/global/RichTextRenderer";
import { Container } from "@/components/layouts/Container";
import {
  CalendarCheckIcon,
  CalendarDotsIcon,
  ChalkboardTeacherIcon,
  CopySimpleIcon,
  CurrencyCircleDollarIcon,
  InfoIcon,
  MapPinLineIcon,
  ReadCvLogoIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ProgramBreadcrumb } from "./ProgramBreadcrumb";
import { Card } from "@/components/ui";

import placeholder from "@/assets/images/program-image.webp";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function ServiceDetailsPage() {
  const params = useParams();
  const { resetPageHead } = usePageHeadStore();

  useEffect(() => {
    resetPageHead();
  }, []);

  const {
    data: programs,
    isLoading,
    error,
  } = useStrapi("programs", {
    populate: {
      artist: {
        populate: "*",
      },
      category: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
    },
  });

  const programItem: Program | undefined = programs?.data.find(
    (program: Program) => program.slug === params.name,
  );

  console.log(programItem);

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading posts.</p>;

  if (!programItem) return <p>Service not found.</p>;

  return (
    <main className="pb-10">
      <Container className="py-16">
        <div className="col-span-8">
          <div className="space-y-3">
            <ProgramBreadcrumb
              category={programItem.category.title}
              slug={programItem.category.slug}
            />
            <h1 className="text-3xl font-extrabold">{programItem.title}</h1>
            <p className="text-muted-foreground text-lg">
              {programItem.sub_title}
            </p>
          </div>
        </div>
      </Container>

      <Container className="py-0">
        <div className="grid grid-cols-12 items-start gap-10">
          <div className="col-span-8">
            <RichTextRenderer content={programItem.description} />

            <hr className="my-6" />

            <div className="space-y-4 text-[15px]">
              {programItem.additional_note && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <InfoIcon
                      size={18}
                      weight="duotone"
                      className="text-yellow-600"
                    />
                    <span className="font-bold">توضیحات اضافی:</span>
                  </div>
                  <div className="pr-5">{programItem.additional_note}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-5 p-4">
              <div className="shrink-0">
                <Image
                  src={programItem.artist?.image?.url}
                  alt={programItem.title}
                  className="h-[180px] w-auto rounded"
                  width={270}
                  height={320}
                  priority
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  <Link
                    href={`/artists/${programItem?.artist?.slug}`}
                    className="text-primary hover:text-secondary flex items-center gap-1"
                  >
                    <ReadCvLogoIcon size={22} />
                    {programItem?.artist?.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground line-clamp-5 leading-relaxed">
                  {programItem?.artist?.intro_text}
                </p>
              </div>
            </div>
          </div>

          <Card className="sticky top-5 col-span-4 -mt-44 pb-1">
            <div>
              <Image
                src={programItem.image?.url || placeholder}
                alt={programItem.title}
                width={370}
                height={250}
                priority
              />
            </div>
            <h2 className="text-lg font-semibold">جزئیات کلاس:</h2>

            <div className="[&>div]:flex [&>div]:h-12 [&>div]:items-center [&>div]:justify-between [&>div]:border-t [&>div]:border-dashed [&>div]:border-gray-200 [&>div]:px-2 [&>div_svg]:text-teal-600">
              <div>
                <div className="flex items-center gap-2">
                  <CurrencyCircleDollarIcon size={22} weight="duotone" />
                  <span className="font-medium">قیمت:</span>
                </div>
                <div className="text-lg font-bold text-rose-600">
                  €{programItem.price}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <ChalkboardTeacherIcon size={22} weight="duotone" />
                  <span className="font-medium">مدرس:</span>
                </div>
                <Link
                  href={`/artists/${programItem?.artist?.slug}`}
                  className="hover:text-secondary"
                >
                  {programItem?.artist?.title}
                </Link>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CopySimpleIcon size={22} weight="duotone" />
                  <span className="font-medium">تعداد جلسات:</span>
                </div>
                <div>{programItem.sessions} جلسه</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CalendarCheckIcon size={22} weight="duotone" />
                  <span className="font-medium">روزهای برگزاری:</span>
                </div>
                <div>{programItem.days}</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDotsIcon size={22} weight="duotone" />
                  <span className="font-medium">تاریخ شروع:</span>
                </div>
                {new Date(programItem.start_date).toLocaleDateString("en-GB")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <UsersIcon size={22} weight="duotone" />
                  <span className="font-medium">ظرفیت:</span>
                </div>
                {programItem.capacity} نفر
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <MapPinLineIcon size={22} weight="duotone" />
                  <span className="font-medium">محل برگزاری:</span>
                </div>
                <div>{programItem.address}</div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
