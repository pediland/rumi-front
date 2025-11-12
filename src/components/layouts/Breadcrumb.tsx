import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";

interface SiteBreadcrumbProps {
  category: string;
  slug: string;
}

export const SiteBreadcrumb = ({ category, slug }: SiteBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1.5">
        <BreadcrumbItem>
          <Link href="/" className="hover:text-foreground text-gray-400">
            خانه
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-gray-400" />
        <BreadcrumbItem>
          <Link
            href="/services"
            className="hover:text-foreground text-gray-400"
          >
            خدمات
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
