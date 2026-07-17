"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { InterestItem } from "@/lib/site";
import { ABOUT_BIO, INTERESTS, SITE } from "@/lib/site";

function ZoneLabel({ letter }: { letter: string }) {
  return (
    <span
      aria-hidden="true"
      className="mb-2 block font-mono text-[11px] leading-none tracking-[0.12em] text-muted"
    >
      {letter}
    </span>
  );
}

export function AboutView() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const openItem = INTERESTS.find((item) => item.id === openId) ?? null;
  const activePhoto = {
    src: openItem?.imageSrc ?? "/about.jpg",
    alt: openItem?.imageAlt ?? SITE.fullName,
  };

  return (
    <section className="grid w-full max-w-5xl grid-cols-1 items-start gap-8 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-x-12 md:gap-y-10 lg:gap-x-16">
      {/* A — living photo panel */}
      <div className="relative mx-auto w-full max-w-[340px] md:mx-0 md:mt-14 md:max-w-none lg:mt-16">
        <div className="absolute -top-6 left-0">
          <ZoneLabel letter="a" />
        </div>
        <figure className="relative flex flex-col">
          <div className="relative aspect-square w-full overflow-hidden border border-dim">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePhoto.src}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={
                  reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }
                }
                className="absolute inset-0"
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 768px) 340px, 420px"
                  className={`object-cover ${
                    openItem?.imageSrc
                      ? "object-center"
                      : "object-[center_18%]"
                  }`}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* scan-style frame corners */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-bg/80 px-2.5 py-2 backdrop-blur-[2px]">
              <span className="text-[10px] lowercase tracking-wide text-fg">
                {openItem ? openItem.title : SITE.fullName.toLowerCase()}
              </span>
              <span className="text-[10px] tabular-nums text-muted">
                {openItem ? `img · ${openItem.id}` : "img · portrait"}
              </span>
            </div>
          </div>
        </figure>
      </div>

      {/* B — vertically centered on the photo midpoint */}
      <div className="flex min-w-0 flex-col justify-center self-stretch md:mt-14 md:pt-32 lg:mt-16 lg:pt-36">
        <ZoneLabel letter="b" />
        <div className="space-y-4 border-l border-accent/50 pl-4 md:pl-5">
          <div className="space-y-1.5">
            <p className="font-mono text-[15px] lowercase leading-none text-fg sm:text-[17px]">
              {SITE.fullName.toLowerCase()}
            </p>
            <p className="text-[11px] lowercase text-muted">
              cs + ai · northeastern ·{" "}
              <span className="normal-case">IBM</span> fde · fall 2026
            </p>
          </div>
          <p className="max-w-md text-[13px] leading-[1.75] text-fg/90 sm:text-[14px]">
            {ABOUT_BIO}
          </p>
        </div>
      </div>

      {/* C — below, under the bio column */}
      <div className="min-w-0 md:col-start-2">
        <ZoneLabel letter="c" />
        <ul className="w-full border-t border-dim">
          {INTERESTS.map((item, index) => {
            const isOpen = openId === item.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <InterestRow
                key={item.id}
                item={item}
                num={num}
                isOpen={isOpen}
                onToggle={() => setOpenId(isOpen ? null : item.id)}
                reduceMotion={!!reduceMotion}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function InterestRow({
  item,
  num,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  item: InterestItem;
  num: string;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  return (
    <li className="border-b border-dim">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={`group flex w-full items-center gap-3 py-3.5 text-left font-mono text-[13px] lowercase outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:text-[14px] ${
          isOpen ? "text-accent" : "text-fg hover:text-accent"
        }`}
      >
        <span
          className={`w-6 tabular-nums text-[11px] ${
            isOpen ? "text-accent" : "text-dim group-hover:text-muted"
          }`}
        >
          {num}
        </span>
        <span className="flex-1">{item.title}</span>
        <span
          className={`text-[11px] transition-transform duration-200 ${
            isOpen ? "rotate-90 text-accent" : "text-muted"
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={`${item.id}-body`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }
            }
            className="overflow-hidden"
          >
            <p className="pb-4 pl-9 pr-2 text-[12px] leading-relaxed text-muted sm:text-[13px]">
              {item.body}
              {item.imageSrc ? (
                <span className="mt-1 block text-[10px] text-dim">
                  photo updates in panel a
                </span>
              ) : null}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
