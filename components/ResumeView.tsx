"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SITE } from "@/lib/site";

const META = [
  { k: "file", v: "resume.pdf" },
  { k: "updated", v: "jul 2026" },
  { k: "status", v: "current" },
];

export function ResumeView() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.35, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full w-full max-w-6xl flex-col overflow-hidden lowercase"
    >
      <motion.div
        variants={item}
        className="mb-5 flex shrink-0 items-baseline justify-between gap-3 border-b border-hairline pb-3"
      >
        <h1 className="text-base tracking-[0.2em] text-accent sm:text-lg">
          resume
        </h1>
        <p className="text-xs tabular-nums text-dim">01 / document</p>
      </motion.div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-hidden md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[320px_1fr]">
        {/* left — dossier readout */}
        <motion.div
          variants={item}
          className="flex min-h-0 flex-col justify-between gap-6 overflow-y-auto"
        >
          <div className="space-y-5">
            <div className="border-l border-accent/50 pl-3">
              <p className="font-mono text-sm text-fg">
                <span className="text-muted">$</span> open --resume
              </p>
            </div>

            <ul className="space-y-2.5">
              {META.map((row) => (
                <li
                  key={row.k}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-dim/60 pb-2 text-xs sm:text-[13px]"
                >
                  <span className="tracking-[0.14em] text-accent">{row.k}</span>
                  <span className="text-right normal-case text-muted">
                    {row.v}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-[11px] text-dim">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span>{loaded ? "preview live" : "loading preview…"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.a
              href={SITE.resumePath}
              download
              whileHover={reduce ? undefined : { x: 3 }}
              className="group flex items-center justify-between border border-fg px-4 py-3 font-mono text-sm text-fg outline-none transition-colors hover:border-accent hover:bg-accent hover:text-bg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span>download</span>
              <span aria-hidden="true">↓</span>
            </motion.a>
            <motion.a
              href={SITE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { x: 3 }}
              className="group flex items-center justify-between border border-dim px-4 py-3 font-mono text-sm text-muted outline-none transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span>open in new tab</span>
              <span aria-hidden="true">↗</span>
            </motion.a>
          </div>
        </motion.div>

        {/* right — live preview */}
        <motion.div
          variants={item}
          className="relative flex min-h-0 items-start justify-center overflow-hidden"
        >
          <iframe
            title="resume preview"
            src={`${SITE.resumePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="h-full max-h-full w-auto max-w-full"
            style={{ aspectRatio: "8.5 / 11" }}
            onLoad={() => setLoaded(true)}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
