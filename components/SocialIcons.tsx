import { SITE } from "@/lib/site";

interface SocialIconsProps {
  className?: string;
}

const linkClass =
  "text-fg transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const svgClass = "h-[16px] w-[16px] fill-current";

export function SocialIcons({ className = "" }: SocialIconsProps) {
  return (
    <ul className={`flex items-center gap-[16px] ${className}`} aria-label="Social">
      <li>
        <a
          href={SITE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={linkClass}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={svgClass}>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.688-1.335-1.688-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href={SITE.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={linkClass}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={svgClass}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${SITE.email}`}
          aria-label="Email"
          className={linkClass}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={svgClass}>
            <path d="M1.5 4.5A2.25 2.25 0 013.75 2.25h16.5A2.25 2.25 0 0122.5 4.5v15a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 19.5v-15zm2.4.75l7.35 5.512a1.5 1.5 0 001.8 0L20.1 5.25H3.9zm16.35 2.318l-6.39 4.793a3 3 0 01-3.72 0L3.75 7.568V19.5h16.5V7.568z" />
          </svg>
        </a>
      </li>
    </ul>
  );
}
