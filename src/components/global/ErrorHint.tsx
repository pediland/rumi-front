import { cn } from "@/lib/utils";
import { CloudSlashIcon, EggCrackIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

interface ErrorHintProps {
  type: "server" | "client" | "not-found";
}

export const ErrorHint = ({ type }: ErrorHintProps) => {
  const t = useTranslations("Error");

  return (
    <div className="text-destructive flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        {type === "not-found" && <EggCrackIcon size={36} weight="duotone" />}
        {type === "server" && <CloudSlashIcon size={36} weight="duotone" />}

        <p>
          {type === "not-found"
            ? t("notFound")
            : type === "server"
              ? t("server")
              : t("client")}
        </p>
      </div>
    </div>
  );
};
