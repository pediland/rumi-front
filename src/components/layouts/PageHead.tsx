"use client";

import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useLocale } from "next-intl";
import { SiteBreadcrumb } from "./Breadcrumb";

export function PageHead({ breadcrumb }: { breadcrumb?: boolean }) {
  const { title, description } = usePageHeadStore();
  const locale = useLocale();

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="py-0">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            className={cn(
              "text-2xl",
              locale === "fa" ? "font-semibold" : "font-medium",
            )}
          >
            {title}
          </h1>

          {breadcrumb && <SiteBreadcrumb category={title} slug={title} />}
        </div>
      </Container>
    </div>
  );
}
