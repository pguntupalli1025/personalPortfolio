import { Logo } from "@/components/Logo";
import { MainNav } from "@/components/MainNav";
import { PageTransition } from "@/components/PageTransition";
import { SocialIcons } from "@/components/SocialIcons";
import { HOME_FOOTER, HOME_QUOTE } from "@/lib/site";

export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative flex h-dvh w-full flex-col items-center overflow-hidden px-6">
        {/* logo + tagline — upper area, centered */}
        <div className="mt-[22vh] flex flex-col items-center text-center">
          <Logo size="lg" href="/" />
          <p className="mt-[18px] font-mono text-[12px] font-normal lowercase leading-snug text-muted">
            {HOME_QUOTE}
          </p>
        </div>

        {/* nav + socials — left-aligned block, shifted toward the left */}
        <div className="mt-[13vh] flex origin-top-left -translate-x-12 scale-110 flex-col items-start sm:-translate-x-16 lg:-translate-x-24">
          <MainNav />
          <SocialIcons className="mt-[44px] translate-x-5" />
        </div>

        <footer className="absolute bottom-[28px] left-0 right-0 flex flex-wrap items-center justify-center gap-x-3 px-4 text-[12px] font-normal lowercase leading-none text-muted">
          <span className="text-fg">{HOME_FOOTER.status}</span>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <span>{HOME_FOOTER.place}</span>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <span>{HOME_FOOTER.mark}</span>
        </footer>
      </main>
    </PageTransition>
  );
}
