"use client";

import { useMemo, useState } from "react";
import { SKILL_GROUPS, type SkillGroup } from "@/lib/site";

const ACCENT = "#e11d2a";

interface SkillNode {
  id: string;
  label: string;
  groupId: string;
  x: number;
  y: number;
  ring: number;
}

const CX = 280;
const CY = 250;
const RINGS = [70, 120, 170, 220];
const RING_LABELS = ["DATA", "FRAME", "TOOLS", "LANG"] as const;

function buildNodes(groups: SkillGroup[]): SkillNode[] {
  const ringByGroup: Record<string, number> = {
    libraries: 0,
    frameworks: 1,
    tools: 2,
    languages: 3,
  };

  const nodes: SkillNode[] = [];

  groups.forEach((group) => {
    const ring = ringByGroup[group.id] ?? 2;
    const radius = RINGS[ring];
    const count = group.items.length;
    // Offset each ring so labels don't stack on the same rays
    const phase = (ring * Math.PI) / 5;

    group.items.forEach((item, i) => {
      const angle = phase + (i / count) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        id: `${group.id}-${item}`,
        label: item,
        groupId: group.id,
        x: CX + Math.cos(angle) * radius,
        y: CY + Math.sin(angle) * radius,
        ring,
      });
    });
  });

  return nodes;
}

function buildEdges(nodes: SkillNode[]): [SkillNode, SkillNode][] {
  const edges: [SkillNode, SkillNode][] = [];
  const byRing = new Map<number, SkillNode[]>();

  nodes.forEach((node) => {
    const list = byRing.get(node.ring) ?? [];
    list.push(node);
    byRing.set(node.ring, list);
  });

  // Connect neighbors on each ring
  byRing.forEach((ringNodes) => {
    for (let i = 0; i < ringNodes.length; i++) {
      edges.push([ringNodes[i], ringNodes[(i + 1) % ringNodes.length]]);
    }
  });

  // A few spokes between rings for constellation feel
  const spokes: [string, string][] = [
    ["libraries-NumPy", "frameworks-React"],
    ["libraries-pandas", "frameworks-Next.js"],
    ["frameworks-React", "tools-Git"],
    ["frameworks-Next.js", "tools-VSCode"],
    ["tools-Git", "languages-Python"],
    ["tools-Linux", "languages-Java"],
    ["tools-MySQL", "languages-JavaScript"],
  ];

  const byId = new Map(nodes.map((n) => [n.id, n]));
  spokes.forEach(([a, b]) => {
    const na = byId.get(a);
    const nb = byId.get(b);
    if (na && nb) edges.push([na, nb]);
  });

  return edges;
}

export function SkillsView() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const nodes = useMemo(() => buildNodes(SKILL_GROUPS), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const totalSkills = SKILL_GROUPS.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden lowercase">
      {/* blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mb-3 flex shrink-0 items-baseline justify-between gap-3 border-b border-hairline pb-3">
        <h1 className="text-sm tracking-[0.2em] text-accent">skills</h1>
        <p className="text-[11px] tabular-nums text-dim">
          {String(SKILL_GROUPS.length).padStart(2, "0")} / groups
        </p>
      </div>

      <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[1fr_200px] lg:gap-6">
        {/* constellation */}
        <div className="relative min-h-0 overflow-hidden">
          <svg
            viewBox="0 0 560 500"
            className="h-full w-full"
            role="img"
            aria-label="Skill constellation map"
          >
            {/* rings */}
            {RINGS.map((r, i) => {
              const ringGroupId =
                (["libraries", "frameworks", "tools", "languages"] as const)[i];
              const hot = activeId === ringGroupId;
              const dim = activeId !== null && !hot;

              return (
                <g key={r}>
                  <circle
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke={ACCENT}
                    strokeOpacity={dim ? 0.1 : hot ? 0.55 : 0.28}
                    strokeWidth={1}
                  />
                  <text
                    x={CX}
                    y={CY - r + 3}
                    textAnchor="middle"
                    className="fill-accent font-mono"
                    style={{ fontSize: 9, letterSpacing: "0.14em" }}
                    opacity={dim ? 0.3 : 0.7}
                  >
                    {RING_LABELS[i]}
                  </text>
                </g>
              );
            })}

            {/* edges */}
            {edges.map(([a, b], i) => {
              const dim =
                activeId !== null &&
                a.groupId !== activeId &&
                b.groupId !== activeId;
              const hot =
                activeId !== null &&
                (a.groupId === activeId || b.groupId === activeId);
              return (
                <line
                  key={`${a.id}-${b.id}-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={ACCENT}
                  strokeOpacity={dim ? 0.06 : hot ? 0.55 : 0.22}
                  strokeWidth={1}
                />
              );
            })}

            {/* nodes */}
            {nodes.map((node) => {
              const dim = activeId !== null && node.groupId !== activeId;
              const hot = activeId === node.groupId;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(node.groupId)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(node.groupId)}
                  onBlur={() => setActiveId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}, ${node.groupId}`}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hot ? 4.5 : 3.5}
                    fill={ACCENT}
                    opacity={dim ? 0.2 : 1}
                  />
                  <text
                    x={node.x}
                    y={node.y - 10}
                    textAnchor="middle"
                    className="fill-fg font-mono"
                    style={{ fontSize: 10 }}
                    opacity={dim ? 0.25 : hot ? 1 : 0.85}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* center mark */}
            <circle
              cx={CX}
              cy={CY}
              r={3}
              fill="none"
              stroke={ACCENT}
              strokeOpacity={0.6}
            />
            <line
              x1={CX - 10}
              y1={CY}
              x2={CX + 10}
              y2={CY}
              stroke={ACCENT}
              strokeOpacity={0.35}
            />
            <line
              x1={CX}
              y1={CY - 10}
              x2={CX}
              y2={CY + 10}
              stroke={ACCENT}
              strokeOpacity={0.35}
            />
          </svg>

          {/* corner ticks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/70"
          />
        </div>

        {/* legend */}
        <aside className="flex shrink-0 flex-col justify-center border border-dim/80 bg-bg/40 px-3 py-3 lg:border-l lg:border-y-0 lg:border-r-0 lg:pl-4">
          <p className="mb-3 text-[10px] tracking-[0.16em] text-accent">
            legend
          </p>
          <ul className="space-y-3">
            {SKILL_GROUPS.map((group, index) => {
              const active = activeId === group.id;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(group.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(group.id)}
                    onBlur={() => setActiveId(null)}
                    className={`flex w-full items-start gap-2.5 text-left outline-none transition-opacity ${
                      activeId && !active ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 shrink-0 bg-accent"
                    />
                    <span className="min-w-0">
                      <span className="block text-[10px] tabular-nums text-dim">
                        {String(index + 1).padStart(2, "0")} · {group.short}
                      </span>
                      <span className="block text-[12px] text-fg">
                        {group.label}
                      </span>
                      <span className="block text-[10px] tabular-nums text-muted">
                        {String(group.items.length).padStart(2, "0")} skills
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-auto hidden pt-6 text-[10px] tabular-nums text-dim lg:block">
            {String(totalSkills).padStart(2, "0")} total
          </p>
        </aside>
      </div>

      <footer className="relative mt-3 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t border-hairline pt-3 text-[10px] tracking-wide text-dim">
        <span className="text-accent">scan</span>
        <span aria-hidden="true">·</span>
        <span>stack complete</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">est. 2026</span>
        <span className="ml-auto tabular-nums text-muted">
          {activeId
            ? SKILL_GROUPS.find((g) => g.id === activeId)?.label
            : "hover a node"}
        </span>
      </footer>
    </section>
  );
}
