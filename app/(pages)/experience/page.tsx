import type { Metadata } from "next";
import { EXPERIENCE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  const ibm = EXPERIENCE.find((entry) => entry.company === "IBM");
  const rest = EXPERIENCE.filter((entry) => entry.company !== "IBM");

  return (
    <section className="flex h-full w-full max-w-6xl flex-col overflow-hidden lowercase">
      <div className="mb-3 flex shrink-0 items-baseline justify-between gap-3 border-b border-hairline pb-3">
        <h1 className="text-sm tracking-[0.2em] text-accent">experience</h1>
        <p className="text-[11px] tabular-nums text-dim">
          {String(EXPERIENCE.length).padStart(2, "0")} / roles
        </p>
      </div>

      {ibm ? (
        <div className="mb-5 shrink-0 border-y border-accent/30 py-3 sm:py-3.5">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base leading-snug text-muted sm:text-lg">
            <span className="text-fg">incoming</span>
            <span className="text-dim">·</span>
            <span className="normal-case text-accent">IBM</span>
            <span className="text-dim">·</span>
            <span className="tabular-nums">{ibm.dates}</span>
            {ibm.location ? (
              <>
                <span className="text-dim">·</span>
                <span className="text-dim">{ibm.location}</span>
              </>
            ) : null}
          </p>
        </div>
      ) : null}

      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* shared spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-1 left-[11px] top-1 w-px bg-accent/45 sm:left-1/2 sm:-translate-x-px"
        />

        <ul className="relative grid h-full grid-cols-1 content-start gap-x-12 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
          {rest.map((entry, index) => {
            const num = String(index + 1).padStart(2, "0");
            const onLeft = index % 2 === 0;

            return (
              <li
                key={`${entry.company}-${entry.role}`}
                className={`relative self-start pl-8 sm:pl-0 ${
                  onLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"
                }`}
              >
                {/* tick on the spine */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 h-2.5 w-2.5 rotate-45 border border-accent bg-bg ${
                    onLeft
                      ? "left-[7px] sm:right-0 sm:left-auto sm:translate-x-1/2"
                      : "left-[7px] sm:left-0 sm:-translate-x-1/2"
                  }`}
                />

                <p
                  className={`text-[10px] tabular-nums tracking-wide text-accent ${
                    onLeft ? "sm:text-right" : ""
                  }`}
                >
                  {num}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-fg">
                  {entry.role}
                  <span className="text-muted">
                    {" "}
                    @{" "}
                    <span className="normal-case text-accent">
                      {entry.company}
                    </span>
                  </span>
                </p>
                <p
                  className={`mt-0.5 text-[11px] tabular-nums text-muted ${
                    onLeft ? "sm:ml-auto" : ""
                  }`}
                >
                  <span className="border-b border-accent/40 pb-px">
                    {entry.dates}
                  </span>
                  {entry.location ? (
                    <span className="text-dim"> · {entry.location}</span>
                  ) : null}
                </p>
                <ul
                  className={`mt-1.5 space-y-0.5 ${
                    onLeft
                      ? "sm:ml-auto sm:border-r sm:border-accent/35 sm:pr-3 sm:text-right"
                      : "border-l border-accent/35 pl-3"
                  }`}
                >
                  {entry.notes.map((note) => (
                    <li
                      key={note}
                      className="text-xs leading-snug text-muted"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
