import { Header, PageHead } from "@/components";

interface InnerLayoutProps {
  children: React.ReactNode;
}

export default function InnerLayout({ children }: InnerLayoutProps) {
  return (
    <>
      <div className="mask-repeat-no-repeat flex flex-col bg-linear-to-t from-pink-50 to-blue-100 mask-[url('/images/mask-hero.webp')] bg-cover bg-top mask-cover mask-bottom sm:h-72">
        <div className="flex flex-1 flex-col bg-[url('/images/mask-bg.webp')] bg-cover bg-center">
          <Header />

          <PageHead />
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </>
  );
}
