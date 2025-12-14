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
    <Card className="flex-row items-center bg-gray-50 p-5 shadow-none">
      <div className="shrink-0">
        <Image
          src={programItem.artist?.image?.url}
          alt={programItem.title}
          className="aspect-square w-36 rounded-md object-cover"
          width={270}
          height={320}
          priority
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          <Link
            href={`/artists/${programItem?.artist?.slug}`}
            className="text-primary hover:text-secondary flex items-center gap-1"
          >
            <ReadCvLogoIcon size={22} />
            {programItem?.artist?.title}
          </Link>
        </h2>
        <p className="line-clamp-4 text-[15px] leading-relaxed text-gray-600">
          {programItem?.artist?.intro_text}
        </p>
      </div>
    </Card>
  );
};
