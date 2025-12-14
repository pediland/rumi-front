"use client";

import { useStrapi } from "@/lib/useStrapi";
import { cn } from "@/lib/utils";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { ErrorHint } from "@/components/global/ErrorHint";
import { Loader } from "@/components/global/Loader";
import RichTextRenderer from "@/components/global/RichTextRenderer";
import { Container } from "@/components/layouts/Container";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { ProgramArtistInfo } from "./components/ProgramArtistInfo";
import { ProgramBreadcrumb } from "./components/ProgramBreadcrumb";
import { ProgramGallery } from "./components/ProgramGallery";
import { ProgramSideBarInfo } from "./components/ProgramSideBarInfo";

export default function ProgramDetailsPage() {
  const params = useParams();
  const { resetPageHead } = usePageHeadStore();

  useEffect(() => {
    resetPageHead();
  }, []);

  const { data, isLoading, error } = useStrapi("programs", {
    filters: {
      slug: {
        $eq: params.name,
      },
    },
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
      gallery: {
        populate: "*",
      },
    },
  });

  const program = data?.data?.[0];
  const gallery = program?.gallery;
  const hasGallery = gallery?.length > 0;

  console.log(program);

  if (isLoading) return <Loader />;

  if (error) return <ErrorHint type="server" />;

  if (!program) return <ErrorHint type="not-found" />;

  return (
    <main className="pb-10">
      {hasGallery && <ProgramGallery gallery={gallery} />}

      <Container className={cn(hasGallery ? "py-8" : "py-16")}>
        <div className="col-span-8">
          <div className="space-y-3">
            <ProgramBreadcrumb category={program.category.title} />
            <h1 className="text-secondary text-3xl font-extrabold">
              {program.title}
            </h1>
            <p className="text-muted-foreground text-lg">{program.sub_title}</p>
          </div>
        </div>
      </Container>

      <Container className="py-0">
        <div className="grid grid-cols-3 items-start gap-6">
          <div className="col-span-2">
            <RichTextRenderer content={program.description} />

            <hr className="my-6" />

            <div className="space-y-4 text-[15px]">
              {program.additional_note && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <InfoIcon
                      size={18}
                      weight="duotone"
                      className="text-yellow-600"
                    />
                    <span className="font-bold">توضیحات اضافی:</span>
                  </div>
                  <div className="pr-5">{program.additional_note}</div>
                </div>
              )}
            </div>

            <ProgramArtistInfo programItem={program} />
          </div>

          <ProgramSideBarInfo programItem={program} hasGallery={hasGallery} />
        </div>
      </Container>
    </main>
  );
}
