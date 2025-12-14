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

interface ProgramSideBarInfoProps {
  programItem: Program;
  hasGallery: boolean;
}

export const ProgramSideBarInfo = ({
  programItem,
  hasGallery,
}: ProgramSideBarInfoProps) => {
  return (
    <Card
      className={cn(
        "sticky top-5 col-span-1 gap-2 border-none p-0 pb-1 shadow-none",
        hasGallery ? "-mt-40" : "-mt-44",
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
  );
};
