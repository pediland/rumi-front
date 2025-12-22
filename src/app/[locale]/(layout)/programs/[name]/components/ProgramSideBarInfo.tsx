import { cn } from "@/lib/utils";
import { Program } from "@/types/program";
import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui";
import {
  CalendarCheckIcon,
  CalendarDotsIcon,
  ChalkboardTeacherIcon,
  CopySimpleIcon,
  CurrencyCircleDollarIcon,
  MapPinLineIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";

import placeholder from "@/assets/images/program-image.webp";
import { useTranslations } from "next-intl";

interface ProgramSideBarInfoProps {
  programItem: Program;
  hasGallery: boolean;
}

export const ProgramSideBarInfo = ({
  programItem,
  hasGallery,
}: ProgramSideBarInfoProps) => {
  const t = useTranslations("Programs");

  return (
    <Card
      className={cn(
        "order-1 gap-2 border-none p-0 pb-1 shadow-none sm:sticky sm:top-4 sm:order-2 sm:col-span-1",
        hasGallery ? "sm:-mt-40" : "sm:-mt-44",
      )}
    >
      {!hasGallery && (
        <div>
          <Image
            src={programItem.image?.url || placeholder}
            className="rounded-lg"
            alt={programItem.title}
            width={370}
            height={250}
            priority
          />
        </div>
      )}

      <div className="[&>div]:flex [&>div]:h-12 [&>div]:items-center [&>div]:justify-between [&>div]:border-b [&>div]:border-dashed [&>div]:border-gray-200 [&>div]:px-2 [&>div_svg]:text-teal-600">
        <div>
          <div className="flex items-center gap-2">
            <CurrencyCircleDollarIcon size={22} weight="duotone" />
            <span className="font-medium">{t("price")}:</span>
          </div>
          <div className="text-lg font-bold text-rose-600">
            €{programItem.price}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <ChalkboardTeacherIcon size={22} weight="duotone" />
            <span className="font-medium">{t("tutor")}:</span>
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
            <span className="font-medium">{t("sessions")}:</span>
          </div>
          <div>{programItem.sessions}</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheckIcon size={22} weight="duotone" />
            <span className="font-medium">{t("days")}:</span>
          </div>
          <div>{programItem.days}</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <CalendarDotsIcon size={22} weight="duotone" />
            <span className="font-medium">{t("startDate")}:</span>
          </div>
          {new Date(programItem.start_date).toLocaleDateString("en-GB")}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <UsersIcon size={22} weight="duotone" />
            <span className="font-medium">{t("capacity")}:</span>
          </div>
          {programItem.capacity}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <MapPinLineIcon size={22} weight="duotone" />
            <span className="font-medium">{t("location")}:</span>
          </div>
          <div>{programItem.address}</div>
        </div>
      </div>
    </Card>
  );
};
