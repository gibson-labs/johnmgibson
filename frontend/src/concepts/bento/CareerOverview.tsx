import { useState } from "react";
import { ChevronRight, GraduationCap } from "lucide-react";
import { TIMELINE, TIMELINE_SPANS } from "../content";

const rows = [...TIMELINE].sort((a, b) =>
  Date.parse(TIMELINE_SPANS[a.id].start) - Date.parse(TIMELINE_SPANS[b.id].start));
const colors: Record<string, string> = {
  oit: "var(--careerGold)", "print-mail": "var(--careerBlue)",
  mastercontrol: "var(--accent)", byu: "var(--careerGreen)",
};

function duration(start: number, end: number) {
  const months = Math.max(1, Math.round((end - start) / (30.4375 * 24 * 60 * 60 * 1000)));
  const years = Math.floor(months / 12), rest = months % 12;
  return [years ? `${years}y` : "", rest ? `${rest}mo` : ""].filter(Boolean).join(" ");
}

export default function CareerOverview() {
  const [open, setOpen] = useState<string | null>(null);
  const now = Date.now();
  const firstYear = new Date(Math.min(...rows.map((r) => Date.parse(TIMELINE_SPANS[r.id].start)))).getUTCFullYear();
  const lastYear = Math.max(2027, new Date(now).getUTCFullYear() + 1);
  const axisStart = Date.UTC(firstYear, 0, 1), axisEnd = Date.UTC(lastYear, 0, 1);
  const ticks = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  // Give recent roles more space using one shared, explicitly labeled time scale.
  const earlyEnd = Math.max(axisStart, Math.min(axisEnd, Date.UTC(2023, 0, 1)));
  const earlySpan = earlyEnd - axisStart;
  const earlyWeight = 0.55;
  const weightedSpan = earlySpan * earlyWeight + axisEnd - earlyEnd;
  const pct = (date: number) => {
    const elapsed = Math.max(0, Math.min(axisEnd - axisStart, date - axisStart));
    return (Math.min(elapsed, earlySpan) * earlyWeight + Math.max(0, elapsed - earlySpan)) / weightedSpan * 100;
  };
  const labeledTicks = ticks.filter((year) => year !== 2022);
  const grid = "grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-6";
  return (
    <div className="bento-surface overflow-hidden rounded-[28px] bg-[var(--tile)] ring-1 ring-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] px-5 py-3.5 md:px-7">
        <p className="text-[15px] font-medium">Career at a glance</p>
        <p className="text-[13px] text-[var(--muted)]">Select a role to explore</p>
      </div>
      <div className={`${grid} px-5 pb-2 pt-3 md:px-7`} aria-hidden="true">
        <span className="hidden text-[12px] text-[var(--muted)] md:block">Roles & education</span>
        <div className="relative h-5">
          {labeledTicks.map((year) => <span key={year} className="absolute text-[11px] text-[var(--muted)]" style={{ left: `${pct(Date.UTC(year, 0, 1))}%`, transform: year === firstYear ? "none" : year === lastYear ? "translateX(-100%)" : "translateX(-50%)" }}>{year}</span>)}
        </div>
      </div>
      <p className="px-5 pb-3 text-[11px] text-[var(--muted)] md:px-7">Compressed scale before 2023 · exact dates and durations shown for each role.</p>
      {rows.map((r) => {
        const span = TIMELINE_SPANS[r.id];
        const start = Date.parse(span.start), end = span.end ? Date.parse(span.end) : now;
        const point = start === end, expanded = open === r.id;
        const color = colors[r.id];
        return (
          <div key={r.id} className="border-t border-[var(--line)]">
            <button
              type="button" aria-expanded={expanded} aria-controls={`career-details-${r.id}`}
              onClick={() => setOpen(expanded ? null : r.id)}
              className={`${grid} w-full items-center px-5 py-3.5 text-left transition-colors hover:bg-[var(--accentSoft)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)] md:px-7`}
            >
              <span className="flex items-start gap-3">
                <ChevronRight aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 text-[var(--muted)] transition-transform ${expanded ? "rotate-90" : ""}`} />
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span>
                  <span className="block text-[16px] font-medium leading-tight">{r.role}</span>
                  <span className="mt-1 block text-[13px] text-[var(--muted)]">{r.org}</span>
                  <span className="mt-1 block text-[12px] text-[var(--muted)]">{r.period}{!point && ` · ${duration(start, end)}`}</span>
                </span>
              </span>
              <span className="relative block h-10" aria-hidden="true">
                {ticks.map((year) => <span key={year} className="absolute inset-y-0 w-px bg-[var(--line)]" style={{ left: `${pct(Date.UTC(year, 0, 1))}%` }} />)}
                {point ? (
                  <span className="absolute top-2 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full" style={{ left: `${pct(start)}%`, backgroundColor: color }}><GraduationCap className="h-4 w-4 text-[var(--tile)]" /></span>
                ) : (
                  <span className="absolute top-2 h-6 min-w-1 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" style={{ left: `${pct(start)}%`, width: `${Math.max(0, pct(end) - pct(start))}%`, backgroundColor: color }} />
                )}
              </span>
            </button>
            <div id={`career-details-${r.id}`} hidden={!expanded} className="border-t border-[var(--line)] bg-[var(--canvas)] px-6 py-5 md:px-14">
              <p className="max-w-3xl text-[15px] leading-relaxed">{r.summary}</p>
              {r.bullets.length > 0 && <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--muted)]">{r.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {r.stack.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{r.stack.map((tag) => <span key={tag} className="rounded-full bg-[var(--tile)] px-3 py-1 text-[12px]">{tag}</span>)}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
