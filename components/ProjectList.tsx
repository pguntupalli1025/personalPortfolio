"use client";

import { useState } from "react";
import type { ProjectRepo } from "@/lib/github";

interface ProjectListProps {
  projects: ProjectRepo[];
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectRepo;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`texture-panel relative flex flex-col border p-3 transition-colors sm:p-4 ${
        open
          ? "border-accent/50 bg-accent/[0.04]"
          : "border-dim hover:border-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-accent/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-accent/70"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-[10px] tabular-nums tracking-wide text-dim">
            project · {num}
          </p>
          <h2 className="text-sm font-medium text-fg">{project.name}</h2>
          {project.badge ? (
            <p className="text-[10px] lowercase leading-snug text-accent">
              {project.badge}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 border border-hairline px-1.5 py-0.5 text-[10px] text-muted tabular-nums">
          ★ {project.stargazerCount}
        </span>
      </div>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`mt-3 flex w-full items-center justify-between gap-3 border-t border-dim pt-3 text-left font-mono text-[11px] lowercase outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
          open ? "text-accent" : "text-muted hover:text-accent"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <span
            className={`inline-flex h-4 w-4 items-center justify-center border text-[10px] leading-none ${
              open ? "border-accent text-accent" : "border-dim text-muted"
            }`}
            aria-hidden="true"
          >
            {open ? "−" : "+"}
          </span>
          {open ? "hide description" : "description"}
        </span>
        <span aria-hidden="true">{open ? "v" : ">"}</span>
      </button>

      {open ? (
        <p className="mt-2 border-l border-accent/50 pl-3 text-xs leading-relaxed text-muted">
          {project.description ?? "No description yet."}
        </p>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
        {project.primaryLanguage ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor: project.primaryLanguage.color ?? "#8a8a86",
              }}
              aria-hidden="true"
            />
            {project.primaryLanguage.name}
          </span>
        ) : (
          <span className="text-[11px] text-dim">-</span>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-fg outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          view on github →
        </a>
      </div>
    </article>
  );
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
}
