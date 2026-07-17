import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { getPinnedProjects } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const { projects, isFallback } = await getPinnedProjects();

  return (
    <section className="flex h-full w-full flex-col justify-center py-2">
      <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-hairline pb-3 sm:mb-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xs tracking-[0.2em] text-accent">Projects</h1>
          <span className="hidden text-[10px] lowercase text-dim sm:inline">
            selected work
          </span>
        </div>
        {isFallback ? (
          <p className="text-[10px] text-dim">showing placeholders</p>
        ) : (
          <p className="text-[10px] tabular-nums text-dim">
            {String(projects.length).padStart(2, "0")} files
          </p>
        )}
      </div>
      <ProjectList projects={projects} />
    </section>
  );
}
