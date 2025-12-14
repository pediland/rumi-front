"use client";

import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import backgroundImage from "@/assets/images/bg-contact-01.webp";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const { setPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead({
      title: t("title"),
      backgroundImage: backgroundImage.src,
    });
  }, [setPageHead]);

  return <p></p>;
}
