import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { Header } from "@/components/layouts/Header";
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, "children">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;
  const messages = await getMessages();
  const rtl = locale === "fa";

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} className={fontVariables}>
      <body
        className={cn(
          "flex h-screen flex-col",
          rtl ? "font-vazirmatn" : "font-ubuntu",
          "antialiased",
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <>
            <Header />

            <main className="flex-1">{children}</main>
          </>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
