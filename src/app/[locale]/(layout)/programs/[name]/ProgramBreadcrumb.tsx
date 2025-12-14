"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProgramBreadcrumbProps {
  category: string;
  slug: string;
}

export const ProgramBreadcrumb = ({
  category,
  slug,
}: ProgramBreadcrumbProps) => {
  const t = useTranslations("Breadcrumbs");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" className="hover:text-foreground text-gray-400">
            {t("home")}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-gray-400" />
        <BreadcrumbItem>
          <Link
            href="/programs"
            className="hover:text-foreground text-gray-400"
          >
            {t("programs")}
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
