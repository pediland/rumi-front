"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProgramBreadcrumbProps {
  category: string;
}

export const ProgramBreadcrumb = ({ category }: ProgramBreadcrumbProps) => {
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
        <BreadcrumbSeparator className="text-gray-400" />
        <BreadcrumbItem>{category}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
