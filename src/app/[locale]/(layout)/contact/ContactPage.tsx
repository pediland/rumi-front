"use client";

import { usePageHeadStore } from "@/store/usePageHeadStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Container } from "@/components";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const { setPageHead, resetPageHead } = usePageHeadStore();

  useEffect(() => {
    setPageHead(t("title"), t("description"));
    return () => resetPageHead();
  }, [setPageHead, resetPageHead, t]);

  return <p></p>;
}
