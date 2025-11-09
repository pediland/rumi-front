import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ErrorHintProps {
  type: "server" | "client";
}

export const ErrorHint = ({ type }: ErrorHintProps) => {
  const t = useTranslations("Error");

  return (
    <div className="flex h-full items-center justify-center text-destructive">
      <p>{t("server")}</p>
    </div>
  );
};
