import { Link } from "@/i18n/navigation";
import { Program } from "@/types/program";
import Image from "next/image";

import { Card } from "@/components/ui";
import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";

interface ProgramArtistInfoProps {
  programItem: Program;
}

export const ProgramArtistInfo = ({ programItem }: ProgramArtistInfoProps) => {
  if (!programItem?.artist) return null;

  return (
    <Card className="flex flex-row items-center gap-3 bg-gray-50 p-4 shadow-none sm:gap-4 sm:p-5">
      <div className="flex h-full shrink-0 bg-red-100">
        <Image
          src={programItem.artist?.image?.url}
          alt={programItem.title}
          className="aspect-square w-24 rounded-md object-cover sm:w-36"
          width={270}
          height={320}
          priority
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold sm:text-lg">
          <Link
            href={`/artists/${programItem?.artist?.slug}`}
            className="text-primary hover:text-secondary flex items-center gap-1"
          >
            <ReadCvLogoIcon size={22} />
            {programItem?.artist?.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 sm:line-clamp-4 sm:text-[15px]">
          {programItem?.artist?.intro_text}
        </p>
      </div>
    </Card>
  );
};
