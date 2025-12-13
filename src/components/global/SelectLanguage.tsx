"use client";

import { routing, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeNames: Record<string, string> = {
  fa: "فارسی",
  en: "English",
};

export const SelectLanguage = ({ imageStyle }: { imageStyle?: boolean }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <span className="text-muted-foreground">[ {localeNames[locale]} ]</span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "text-muted-foreground cursor-pointer",
          imageStyle && "text-white",
        )}
      >
        [ {localeNames[locale]} ]
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-auto">
        {routing.locales
          .filter((loc) => loc !== locale)
          .map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                "cursor-pointer",
                locale === "fa" ? "font-roboto" : "font-vazirmatn",
              )}
            >
              {localeNames[loc]}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
