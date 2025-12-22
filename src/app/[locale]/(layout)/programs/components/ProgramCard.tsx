"use client";

import { Link } from "@/i18n/navigation";
import { Program } from "@/types/program";
import { useLocale } from "next-intl";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui/badge";

import placeholder from "@/assets/images/program-image.webp";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const locale = useLocale();

  return (
    <div>
      <Link href={`/programs/${program.slug}`} key={program.id}>
        <Card className="group gap-0 border-none p-0 shadow-none">
          <CardHeader className="relative flex items-center justify-center overflow-hidden rounded-md p-0">
            <Image
              src={program.image?.url || placeholder}
              className="aspect-5/3 rounded-md object-cover transition-all duration-300 group-hover:scale-105 sm:aspect-auto"
              width={382}
              height={272}
              alt={program.title}
            />
            <Badge
              variant="outline"
              className={cn(
                "absolute top-2 rounded-md border-none bg-black/40 pt-1 pb-0.75 text-[13px] font-normal text-white",
                locale === "fa" ? "left-2" : "right-2",
              )}
            >
              {program.category?.title}
            </Badge>
          </CardHeader>
          <CardContent className="flex justify-between px-0 pt-3 sm:flex-col sm:gap-1.5 sm:pb-1.5">
            <div>
              <h2
                className={cn(
                  "group-hover:text-primary line-clamp-1 text-[17px] duration-300",
                  locale === "fa" ? "font-semibold" : "font-medium",
                )}
              >
                {program.title}
              </h2>
              <div
                className={cn(
                  "text-muted-foreground line-clamp-2 text-[15px]",
                  locale === "fa" ? "font-medium" : "",
                )}
              >
                {program.sub_title}
              </div>
            </div>
            <div className="text-secondary leading-7 font-bold">
              €{program.price}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
