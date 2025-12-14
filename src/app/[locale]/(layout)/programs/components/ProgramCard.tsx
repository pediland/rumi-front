import { Link } from "@/i18n/navigation";
import { Program } from "@/types/program";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui/badge";

import placeholder from "@/assets/images/program-image.webp";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <div>
      <Link href={`/programs/${program.slug}`} key={program.id}>
        <Card className="group gap-0 border-none p-0 shadow-none">
          <CardHeader className="relative flex items-center justify-center overflow-hidden rounded-md p-0">
            <Image
              src={program.image?.url || placeholder}
              className="rounded-md object-cover transition-all duration-300 group-hover:scale-105"
              width={273}
              height={183}
              alt={program.title}
            />
            <Badge
              variant="outline"
              className="absolute top-2 right-2 rounded-md border-none bg-black/40 pt-1 pb-0.75 text-[13px] font-normal text-white"
            >
              {program.category?.title}
            </Badge>
          </CardHeader>
          <CardContent className="px-0 pt-3 pb-1.5">
            <h2 className="group-hover:text-primary line-clamp-1 text-[17px] font-semibold duration-300">
              {program.title}
            </h2>
            <div className="text-muted-foreground line-clamp-2 text-[15px] font-medium">
              {program.sub_title}
            </div>
            <div className="text-secondary mt-1.5 font-bold">
              €{program.price}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
