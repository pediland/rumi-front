"use client";

import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useLocale } from "next-intl";

export function PageHead() {
  const { title, description } = usePageHeadStore();
  const locale = useLocale();

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="py-0">
        <div className="space-y-5 text-center">
          <h1
            className={cn(
              "text-3xl text-blue-950",
              locale === "fa" ? "font-semibold" : "font-medium",
            )}
          >
            {title}
          </h1>
        </div>
      </Container>
    </div>
  );
}
