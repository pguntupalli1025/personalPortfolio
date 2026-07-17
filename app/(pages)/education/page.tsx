import type { Metadata } from "next";
import Image from "next/image";
import { EDUCATION, type EducationEntry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Education",
};

function CornerTicks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent"
      />
    </>
  );
}

function SchoolPhoto({
  entry,
  index,
  className,
  sizes,
  priority,
}: {
  entry: EducationEntry;
  index: number;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <figure className={`relative overflow-hidden border border-dim ${className}`}>
      <Image
        src={entry.imageSrc}
        alt={entry.imageAlt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
      <CornerTicks />
      <span className="absolute bottom-2 left-2 font-mono text-lg tabular-nums leading-none text-accent sm:text-xl">
        {num}
      </span>
    </figure>
  );
}

function NeuCopy({ entry }: { entry: EducationEntry }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-medium normal-case tracking-wide text-accent sm:text-xl">
          {entry.school}
        </p>
        {entry.location ? (
          <p className="mt-1 text-xs text-muted sm:text-sm">{entry.location}</p>
        ) : null}
      </div>

      <div className="border-t border-dashed border-accent/35" />

      <div className="space-y-1.5 text-sm leading-relaxed text-fg sm:text-base">
        <p className="normal-case">{entry.degree}</p>
        {entry.gpa ? <p>gpa: {entry.gpa} / 4.00</p> : null}
        <p className="tabular-nums text-muted">{entry.dates}</p>
        {entry.detail ? <p className="text-dim">{entry.detail}</p> : null}
      </div>

      <ul className="space-y-1.5">
        {entry.highlights.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-relaxed text-muted"
          >
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div>
        <p className="text-[11px] tracking-[0.14em] text-accent">
          relevant coursework
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {entry.coursework.map((course) => (
            <li
              key={course}
              className="flex gap-2.5 text-sm leading-relaxed text-muted"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span className="normal-case">{course}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DoaneCopy({ entry }: { entry: EducationEntry }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-medium normal-case tracking-wide text-accent sm:text-lg">
          {entry.school}
        </p>
        <p className="mt-1 text-xs text-muted sm:text-sm">burlington, nj</p>
      </div>

      <div className="border-t border-dashed border-accent/35" />

      <div className="space-y-1 text-sm text-fg">
        <p className="normal-case">{entry.degree}</p>
        <p className="tabular-nums text-muted">{entry.dates}</p>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.14em] text-accent">highlights</p>
        <ul className="mt-2 space-y-1.5">
          {entry.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm leading-relaxed text-muted"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const [northeastern, doane] = EDUCATION;

  if (!northeastern || !doane) return null;

  return (
    <section className="flex h-full w-full max-w-6xl flex-col overflow-hidden lowercase">
      <div className="mb-5 flex shrink-0 items-baseline justify-between gap-3">
        <h1 className="text-base tracking-[0.2em] text-accent sm:text-lg">
          education
        </h1>
        <p className="text-xs tabular-nums text-dim">
          {String(EDUCATION.length).padStart(2, "0")} / schools
        </p>
      </div>

      {/*
        Nested layout matching mockup 2:
        [ tall NEU photo ] [ NEU copy          ]
        [                ] [ Doane photo | copy ]
      */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto md:grid-cols-[minmax(300px,400px)_1fr] md:gap-10">
        <SchoolPhoto
          entry={northeastern}
          index={0}
          className="aspect-[4/3] w-full md:aspect-auto md:h-full"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />

        <div className="flex min-h-0 flex-col gap-6 md:gap-8">
          <NeuCopy entry={northeastern} />

          <div className="mt-12 grid grid-cols-1 items-start gap-6 border-t border-hairline pt-5 sm:grid-cols-[minmax(260px,380px)_1fr] sm:gap-8 md:mt-16">
            <SchoolPhoto
              entry={doane}
              index={1}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <DoaneCopy entry={doane} />
          </div>
        </div>
      </div>
    </section>
  );
}
