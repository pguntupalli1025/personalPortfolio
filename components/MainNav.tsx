"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className = "" }: MainNavProps) {
  return (
    <nav
      aria-label="Primary"
      className={`flex flex-col items-start gap-[18px] text-left ${className}`}
    >
      {NAV_LINKS.map((link) => {
        const classes =
          "group font-mono text-[12px] font-normal lowercase leading-none text-fg outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

        const label = (
          <>
            <span className="text-transparent group-hover:text-accent group-focus-visible:text-accent">
              {"> "}
            </span>
            {link.label}
          </>
        );

        if (link.external) {
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {label}
            </a>
          );
        }

        return (
          <Link key={link.label} href={link.href} className={classes}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
