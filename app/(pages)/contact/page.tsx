import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcons } from "@/components/SocialIcons";
import { CONTACT_CHANNELS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="flex h-full w-full max-w-5xl flex-col overflow-hidden lowercase">
      <div className="mb-5 flex shrink-0 items-baseline justify-between gap-3 border-b border-hairline pb-3">
        <h1 className="text-base tracking-[0.2em] text-accent sm:text-lg">
          contact
        </h1>
        <p className="text-xs tabular-nums text-dim">let&apos;s talk</p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 overflow-y-auto md:grid-cols-[minmax(240px,320px)_1fr] md:gap-12">
        {/* left — ways to reach me */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              open to internships, collaborations, and good conversations.
              reach me anywhere below or send a message.
            </p>

            <ul className="space-y-3">
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 border-l border-accent/40 py-1 pl-3 outline-none transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span className="text-[11px] tracking-[0.14em] text-accent">
                      {channel.label}
                    </span>
                    <span className="truncate text-right text-xs text-muted transition-colors group-hover:text-fg sm:text-[13px]">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] tracking-[0.14em] text-dim">socials</p>
            <SocialIcons />
          </div>
        </div>

        {/* right — message form */}
        <div className="flex min-w-0 flex-col">
          <p className="mb-4 text-[11px] tracking-[0.14em] text-dim">
            send a message
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
