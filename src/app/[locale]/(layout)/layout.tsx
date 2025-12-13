"use client";

import { Loader } from "@/components/global/Loader";
import { Header } from "@/components/layouts/Header";
import { usePageHeadStore } from "@/store/usePageHeadStore";

interface InnerLayoutProps {
  children: React.ReactNode;
}

export default function InnerLayout({ children }: InnerLayoutProps) {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>
    </>
  );
}
