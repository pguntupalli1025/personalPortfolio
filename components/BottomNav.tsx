"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Site"
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 pb-5 pt-3 text-[12px] lowercase leading-none tracking-normal text-muted sm:gap-x-5"
    >
      {NAV_LINKS.map((link) => {
        const isActive =
          !link.external &&
          (pathname === link.href || pathname.startsWith(`${link.href}/`));

        const classes = [
          "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          isActive ? "text-accent" : "text-muted hover:text-fg",
        ].join(" ");

        if (link.external) {
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {link.label}
            </a>
          );
        }

        return (
          <Link key={link.label} href={link.href} className={classes}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
