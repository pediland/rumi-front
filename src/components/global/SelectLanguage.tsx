"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const localeNames: Record<string, string> = {
  fa: "فارسی",
  en: "English",
};

export const SelectLanguage = () => {
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
    return <span className="text-muted-foreground">[ {localeNames[locale]} ]</span>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-muted-foreground cursor-pointer">
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
