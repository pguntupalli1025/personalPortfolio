import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-light flex h-dvh w-full flex-col overflow-hidden bg-bg text-fg">
      <header className="flex shrink-0 items-center px-5 pt-5 sm:px-8 sm:pt-6">
        <Logo size="sm" href="/" />
      </header>

      <div className="flex min-h-0 flex-1 items-start justify-center overflow-hidden px-5 pt-4 sm:px-8 sm:pt-6">
        <PageTransition>
          <div className="mx-auto flex h-full w-full max-w-6xl items-start justify-center md:pt-2">
            {children}
          </div>
        </PageTransition>
      </div>

      <div className="shrink-0 border-t border-hairline">
        <BottomNav />
      </div>
    </div>
  );
}
