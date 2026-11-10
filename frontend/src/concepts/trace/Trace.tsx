import { Fragment, useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, Copy, Github, Linkedin, X } from "lucide-react";
import {
  PROFILE,
  PROJECTS_V2,
  STACK,
  TIMELINE,
  TIMELINE_SPANS,
  WORK_PROJECTS,
  isWorkProject,
  type ConceptProject,
  type TimelineEntry,
} from "../content";
import { useConceptPage } from "../shared/useConceptPage";
import { useCopyEmail, useLocalTime, useModal } from "../shared/hooks";
import Reveal from "../shared/Reveal";
import ArchDiagram from "../shared/ArchDiagram";
import ConceptSwitcher from "../shared/ConceptSwitcher";

// Concept F — "Trace": the site as an observability console. Career is a trace waterfall.
const C = {
  bg: "#0A0D13",
  panel: "#0F131B",
  panel2: "#151B26",
  line: "rgba(148,163,184,0.12)",
  line2: "rgba(148,163,184,0.22)",
  text: "#E6EAF2",
  muted: "#8A94A8",
  faint: "#5A6478",
  accent: "#2DD4BF",
  ok: "#4ADE80",
};
const SPAN_COLOR: Record<string, string> = {
  oit: "#FBBF24",
  "print-mail": "#60A5FA",
  byu: "#FB7185",
  mastercontrol: "#2DD4BF",
};
const FONTS = "family=Geist:wght@300..700&family=Geist+Mono:wght@400..600";
const mono: CSSProperties = { fontFamily: "'Geist Mono', monospace" };
const EASE = [0.22, 1, 0.36, 1] as const;

const SECTIONS = [
  { id: "overview", label: "overview", color: C.text },
  { id: "career", label: "career", color: C.accent },
  { id: "work", label: "work", color: "#60A5FA" },
  { id: "stack", label: "instrumentation", color: "#FBBF24" },
  { id: "contact", label: "contact", color: "#FB7185" },
];

// Waterfall axis: Jan 2021 → Jan 2027, ticks on each new year.
const AXIS_START = Date.parse("2021-01-01");
const AXIS_END = Date.parse("2027-01-01");
const TICKS = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
const pct = (t: number) => ((t - AXIS_START) / (AXIS_END - AXIS_START)) * 100;

function months(start: number, end: number) {
  const m = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24 * 30.44)));
  const y = Math.floor(m / 12);
  return y ? `${y}y ${m % 12}mo` : `${m}mo`;
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span style={mono} className={`text-[11px] uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

function Chip({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      style={{ ...mono, ...(color ? { color, borderColor: `${color}55`, backgroundColor: `${color}12` } : {}) }}
      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line2)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
    >
      {children}
    </span>
  );
}

function Panel({ title, meta, children, className = "" }: { title: string; meta?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-2.5">
        <Label className="text-[var(--muted)]">{title}</Label>
        {meta}
      </div>
      {children}
    </div>
  );
}

function Diagram({ p }: { p: ConceptProject }) {
  if (!isWorkProject(p)) return null;
  return (
    <ArchDiagram
      diagram={p.diagramKey}
      node={C.panel2}
      line="rgba(148,163,184,0.25)"
      text={C.text}
      muted={C.muted}
      accent={C.accent}
      font="'Geist Mono', monospace"
      radius={6}
      className="w-full"
    />
  );
}

function Overview() {
  const time = useLocalTime(PROFILE.timezone);
  const { copied, copy } = useCopyEmail();
  const start = Date.parse(TIMELINE_SPANS.oit.start);
  const attrs: [string, ReactNode][] = [
    ["service.name", <span className="text-[#FBBF24]">"john-gibson"</span>],
    ["role", <span className="text-[#FBBF24]">"cloud engineer"</span>],
    ["focus", <span className="text-[#A5B4FC]">["ai platforms", "llm gateways", "observability"]</span>],
    ["employer", <span className="text-[#FBBF24]">"MasterControl"</span>],
    ["location", <span className="text-[#FBBF24]">"Utah · {time}"</span>],
    ["education", <span className="text-[#FBBF24]">"B.S. Information Systems, BYU"</span>],
    ["off_hours", <span className="text-[#A5B4FC]">["mountain biking", "scuba", "homelab"]</span>],
  ];

  return (
    <section id="overview" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-wrap items-center gap-2"
      >
        <Chip>root span</Chip>
        <Chip color={C.ok}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" /> status: ok
        </Chip>
        <Chip>duration: {months(start, Date.now())}</Chip>
        <Chip color={C.accent}>● recording</Chip>
      </motion.div>

      <h1 className="mt-6 text-[clamp(3.4rem,7.5vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
        {["John", "Gibson"].map((w, i) => (
          <span key={w} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>
      <p className="mt-5 max-w-2xl text-[19px] leading-snug text-[var(--muted)]">
        {PROFILE.positioning} <span className="text-[var(--text)]">I like systems you can see inside.</span>
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_15rem]">
        <Panel title="span.attributes" meta={<Label className="text-[var(--faint)]">7 keys</Label>}>
          <dl style={mono} className="divide-y divide-[var(--line)] text-[13px]">
            {attrs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 px-4 py-2.5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-[var(--muted)]">{k}</dt>
                <dd className="min-w-0 break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="avatar.jpg" className="flex flex-col">
          <img src={PROFILE.portrait} alt="John Gibson" className="aspect-square w-full flex-1 object-cover lg:aspect-auto" />
        </Panel>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-[14px] font-semibold text-[#04201C] transition hover:brightness-110"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy email"}
        </button>
        {[
          { label: "Résumé", href: PROFILE.resume, icon: ArrowUpRight },
          { label: "GitHub", href: PROFILE.github, icon: Github },
          { label: "LinkedIn", href: PROFILE.linkedin, icon: Linkedin },
        ].map(({ label, href, icon: I }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line2)] px-4 py-2.5 text-[14px] font-medium transition hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
          >
            <I className="h-4 w-4" /> {label}
          </a>
        ))}
      </div>
    </section>
  );
}

function SpanDetail({ r }: { r: TimelineEntry }) {
  return (
    <div className="grid gap-6 border-t border-[var(--line)] bg-[var(--panel2)] px-4 py-5 md:grid-cols-[1fr_16rem] md:px-6">
      <div>
        <p className="text-[15px] leading-relaxed text-[var(--text)]">{r.summary}</p>
        {r.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {r.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-[var(--muted)]">
                <span style={mono} className="text-[var(--faint)]">
                  ├
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <dl style={mono} className="space-y-2 text-[12px]">
        {[
          ["span.org", r.org],
          ["span.location", r.location],
          ["span.period", r.period],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[var(--faint)]">{k}</dt>
            <dd className="text-[var(--text)]">{v}</dd>
          </div>
        ))}
        {r.stack.length > 0 && (
          <div>
            <dt className="text-[var(--faint)]">span.tags</dt>
            <dd className="mt-1 flex flex-wrap gap-1">
              {r.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function Waterfall() {
  const now = Date.now();
  const rows = [...TIMELINE].sort((a, b) => Date.parse(TIMELINE_SPANS[a.id].start) - Date.parse(TIMELINE_SPANS[b.id].start));
  const [open, setOpen] = useState<string | null>("mastercontrol");
  const rootStart = Math.min(...Object.values(TIMELINE_SPANS).map((span) => Date.parse(span.start)));

  const Track = ({ children }: { children?: ReactNode }) => (
    <div className="relative h-7">
      {TICKS.map((t) => (
        <span key={t} className="absolute bottom-[-10px] top-[-10px] w-px bg-[var(--line)]" style={{ left: `${pct(Date.parse(`${t}-01-01`))}%` }} />
      ))}
      {children}
    </div>
  );

  return (
    <Panel
      title="trace · career"
      meta={
        <div className="flex items-center gap-3">
          <Label className="text-[var(--faint)]">{rows.length + 1} spans</Label>
          <Label className="text-[#4ADE80]">0 errors</Label>
        </div>
      }
    >
      {/* axis */}
      <div className="grid grid-cols-1 border-b border-[var(--line)] px-4 py-2 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-6 md:px-6">
        <Label className="hidden text-[var(--faint)] md:block">span</Label>
        <div className="relative h-4">
          {TICKS.map((t) => (
            <span key={t} style={{ ...mono, left: `${pct(Date.parse(`${t}-01-01`))}%` }} className="absolute -translate-x-1/2 text-[11px] text-[var(--faint)] first:translate-x-0 last:-translate-x-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* root span */}
      <div className="grid grid-cols-1 items-center gap-2 border-b border-[var(--line)] px-4 py-3 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-6 md:px-6">
        <div className="flex items-center gap-2 text-[14px]">
          <span className="h-2 w-2 rounded-sm bg-[var(--text)]" />
          <span className="font-medium">john-gibson</span>
          <span style={mono} className="text-[12px] text-[var(--faint)]">
            career
          </span>
        </div>
        <Track>
          <motion.div
            className="absolute inset-y-1.5 origin-left rounded-[3px] bg-[rgba(230,234,242,0.18)]"
            style={{ left: `${pct(rootStart)}%`, width: `${pct(now) - pct(rootStart)}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </Track>
      </div>

      {rows.map((r, i) => {
        const s = TIMELINE_SPANS[r.id];
        const start = Date.parse(s.start);
        const end = s.end ? Date.parse(s.end) : now;
        const color = SPAN_COLOR[r.id];
        const isOpen = open === r.id;
        const point = start === end;
        return (
          <Fragment key={r.id}>
            <button
              onClick={() => setOpen(isOpen ? null : r.id)}
              aria-expanded={isOpen}
              className={`group grid w-full grid-cols-1 items-center gap-2 border-b border-[var(--line)] px-4 py-3 text-left transition-colors hover:bg-[rgba(148,163,184,0.05)] md:grid-cols-[minmax(0,19rem)_1fr] md:gap-6 md:px-6 ${
                isOpen ? "bg-[rgba(148,163,184,0.05)]" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-2 pl-4">
                <ChevronRight className={`h-3.5 w-3.5 shrink-0 text-[var(--faint)] transition-transform ${isOpen ? "rotate-90" : ""}`} />
                <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: color }} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">{r.role}</span>
                  <span style={mono} className="block truncate text-[11.5px] text-[var(--muted)]">
                    {r.org}
                  </span>
                </span>
              </div>
              <Track>
                {point ? (
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45"
                    style={{ left: `${pct(start)}%`, backgroundColor: color }}
                  />
                ) : (
                  <motion.div
                    className="absolute inset-y-1 origin-left overflow-hidden rounded-[3px]"
                    style={{ left: `${pct(start)}%`, width: `${pct(end) - pct(start)}%`, backgroundColor: color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    {r.current && (
                      <span
                        className="trace-live absolute inset-0"
                        style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
                      />
                    )}
                  </motion.div>
                )}
                <span
                  style={{
                    ...mono,
                    // Labels sit after the bar, unless the bar runs to the right edge — then before it.
                    ...(point
                      ? { left: `calc(${pct(start)}% + 12px)` }
                      : pct(end) > 78
                        ? { right: `calc(${100 - pct(start)}% + 8px)` }
                        : { left: `calc(${pct(end)}% + 8px)` }),
                  }}
                  className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] text-[var(--muted)]"
                >
                  {point ? "event" : r.current ? `${months(start, end)} · live` : months(start, end)}
                </span>
              </Track>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <SpanDetail r={r} />
                </motion.div>
              )}
            </AnimatePresence>
          </Fragment>
        );
      })}
    </Panel>
  );
}

function Work({ onOpen }: { onOpen: (p: ConceptProject) => void }) {
  const others = PROJECTS_V2.filter((p) => !isWorkProject(p));
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-2">
        {WORK_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <button onClick={() => onOpen(p)} className="group block h-full w-full text-left">
              <Panel
                title={`service.map · ${p.slug}`}
                meta={<ArrowUpRight className="h-4 w-4 text-[var(--faint)] transition group-hover:text-[#2DD4BF]" />}
                className="h-full transition-colors group-hover:border-[rgba(45,212,191,0.45)]"
              >
                <div className="p-5">
                  <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                  <div className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--bg)] p-2.5">
                    <Diagram p={p} />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
                    {p.highlights.map((h) => (
                      <div key={h.label} className="bg-[var(--panel)] px-3 py-2.5">
                        <div style={mono} className="text-[1.15rem] text-[var(--text)]">
                          {h.value}
                        </div>
                        <div className="text-[11.5px] text-[var(--faint)]">{h.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Panel title="services" meta={<Label className="text-[var(--faint)]">{others.length} more</Label>}>
          <div style={mono} className="hidden grid-cols-[1.4fr_0.8fr_1.4fr_4rem_1.5rem] gap-4 border-b border-[var(--line)] px-5 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--faint)] md:grid">
            <span>service</span>
            <span>type</span>
            <span>tags</span>
            <span>year</span>
            <span />
          </div>
          {others.map((p) => (
            <button
              key={p.slug}
              onClick={() => onOpen(p)}
              className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-[var(--line)] px-5 py-3.5 text-left last:border-0 hover:bg-[rgba(148,163,184,0.05)] md:grid-cols-[1.4fr_0.8fr_1.4fr_4rem_1.5rem]"
            >
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-medium group-hover:text-[#2DD4BF]">{p.title}</span>
                <span className="block truncate text-[12.5px] text-[var(--muted)] md:hidden">{p.summary}</span>
              </span>
              <span style={mono} className="hidden text-[12px] text-[var(--muted)] md:block">
                {p.kind.toLowerCase()}
              </span>
              <span className="hidden flex-wrap gap-1 md:flex">
                {p.stack.slice(0, 3).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </span>
              <span style={mono} className="hidden text-[12px] text-[var(--muted)] md:block">
                {p.year}
              </span>
              <ChevronRight className="h-4 w-4 justify-self-end text-[var(--faint)] transition group-hover:translate-x-0.5 group-hover:text-[#2DD4BF]" />
            </button>
          ))}
        </Panel>
      </Reveal>
    </div>
  );
}

function Drawer({ p, onClose }: { p: ConceptProject | null; onClose: () => void }) {
  useModal(!!p, onClose);
  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-label={p.title}
            className="fixed inset-y-0 right-0 z-[80] w-full max-w-[680px] overflow-y-auto border-l border-[var(--line2)] bg-[var(--panel)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--panel)] px-6 py-3">
              <Label className="text-[var(--muted)]">service · {p.slug}</Label>
              <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-md border border-[var(--line2)] text-[var(--muted)] hover:text-[var(--text)]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                <Chip>{p.kind.toLowerCase()}</Chip>
                <Chip>{p.context}</Chip>
                <Chip>{p.year}</Chip>
              </div>
              <h2 className="mt-4 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em]">{p.title}</h2>
              <p className="mt-2 text-[15px] text-[var(--muted)]">{p.summary}</p>

              <div className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--bg)] p-2.5">
                {isWorkProject(p) ? <Diagram p={p} /> : p.image && <img src={p.image} alt={p.title} className="w-full rounded" />}
              </div>
              {p.note && (
                <p style={mono} className="mt-2 text-[11px] text-[var(--faint)]">
                  {p.note}
                </p>
              )}

              {isWorkProject(p) && (
                <div className="mt-7">
                  <Label className="text-[var(--accent)]">contributions</Label>
                  <ul className="mt-3 space-y-2">
                    {p.contributions.map((c) => (
                      <li key={c} className="flex gap-3 text-[14.5px] leading-relaxed">
                        <span style={mono} className="text-[var(--accent)]">
                          +
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-7 space-y-6">
                {(
                  [
                    ["problem", p.problem],
                    ["approach", p.approach],
                    ["outcome", p.outcome],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <Label className="text-[var(--muted)]">{k}</Label>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#CBD2DF]">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>

              {p.gallery && p.gallery.length > 0 && (
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {p.gallery.map((g) => (
                    <img key={g} src={g} alt="" className="aspect-[16/10] w-full rounded-md border border-[var(--line)] object-cover object-top" />
                  ))}
                </div>
              )}

              {p.links && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line2)] px-3.5 py-2 text-[13px] font-medium hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                    >
                      {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Trace() {
  useConceptPage({ title: "John Gibson — Concept F · Trace", fonts: FONTS, background: C.bg });
  const [active, setActive] = useState("overview");
  const [selected, setSelected] = useState<ConceptProject | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const { copied, copy } = useCopyEmail();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const vars = {
    "--bg": C.bg,
    "--panel": C.panel,
    "--panel2": C.panel2,
    "--line": C.line,
    "--line2": C.line2,
    "--text": C.text,
    "--muted": C.muted,
    "--faint": C.faint,
    "--accent": C.accent,
    backgroundColor: C.bg,
    color: C.text,
    fontFamily: "'Geist', sans-serif",
  } as CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        .trace-live { animation: trace-live 2.2s ease-in-out infinite; }
        @keyframes trace-live { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @media (prefers-reduced-motion: reduce) { .trace-live { animation: none; } }
      `}</style>
      <div style={vars} className="min-h-screen selection:bg-[#2DD4BF] selection:text-[#04201C]">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] backdrop-blur-md" style={{ backgroundColor: "rgba(10,13,19,0.85)" }}>
          <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-4 md:px-6">
            <div style={mono} className="flex min-w-0 items-center gap-2 text-[13px]">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--accent)] text-[11px] font-semibold text-[#04201C]">jg</span>
              <span className="text-[var(--faint)]">traces</span>
              <span className="text-[var(--faint)]">/</span>
              <span className="truncate">john-gibson</span>
            </div>
            <div style={mono} className="hidden flex-1 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-[12px] text-[var(--muted)] md:flex md:max-w-md">
              <span className="text-[var(--faint)]">query</span>
              <span>
                service:<span className="text-[var(--text)]">john-gibson</span> status:<span className="text-[#4ADE80]">ok</span> env:
                <span className="text-[var(--text)]">utah</span>
              </span>
            </div>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--line2)] px-3 py-1.5 text-[13px] font-medium hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
            >
              Résumé <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 pb-28 pt-10 md:px-6 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-24" aria-label="Sections">
              <Label className="text-[var(--faint)]">services</Label>
              <ul className="mt-3 space-y-0.5">
                {SECTIONS.map((s) => {
                  const on = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        style={mono}
                        className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                          on ? "bg-[var(--panel2)] text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color, opacity: on ? 1 : 0.5 }} />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div style={mono} className="mt-8 space-y-1 text-[11.5px] text-[var(--faint)]">
                <p>env: production</p>
                <p>region: us-mountain</p>
                <p>uptime: since 2023</p>
              </div>
            </nav>
          </aside>

          <main className="min-w-0 space-y-24">
            <Overview />

            <section id="career" className="scroll-mt-20">
              <Reveal className="mb-5">
                <Label className="text-[var(--accent)]">career</Label>
                <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em]">Every role is a span.</h2>
                <p className="mt-2 max-w-xl text-[15px] text-[var(--muted)]">Click a span to inspect it. The current one is still recording.</p>
              </Reveal>
              <Reveal>
                <Waterfall />
              </Reveal>
            </section>

            <section id="work" className="scroll-mt-20">
              <Reveal className="mb-5">
                <Label className="text-[#60A5FA]">work</Label>
                <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em]">Services I&apos;ve shipped.</h2>
              </Reveal>
              <Work onOpen={setSelected} />
            </section>

            <section id="stack" className="scroll-mt-20">
              <Reveal className="mb-5">
                <Label className="text-[#FBBF24]">instrumentation</Label>
                <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em]">What I build with.</h2>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-3">
                {STACK.map((g, i) => (
                  <Reveal key={g.group} delay={i * 0.06}>
                    <Panel title={g.group} meta={<Label className="text-[var(--faint)]">{g.items.length}</Label>} className="h-full">
                      <ul style={mono} className="divide-y divide-[var(--line)] text-[13px]">
                        {g.items.map((item) => (
                          <li key={item} className="flex items-center justify-between px-4 py-2">
                            <span>{item}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]/70" />
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="contact" className="scroll-mt-20">
              <Reveal>
                <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] p-8 md:p-12">
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(45,212,191,0.16), transparent 70%)" }}
                  />
                  <Label className="text-[#FB7185]">contact</Label>
                  <h2 className="mt-3 text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                    Let&apos;s start a trace.
                  </h2>
                  <p className="mt-3 max-w-lg text-[16px] text-[var(--muted)]">
                    Questions about LLM gateways, observability, or anything in between — my inbox is open.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <button
                      onClick={copy}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-[15px] font-semibold text-[#04201C] transition hover:brightness-110"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : PROFILE.email}
                    </button>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--line2)] px-4 py-3 text-[15px] font-medium hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
              <footer style={mono} className="mt-8 flex flex-col gap-1 text-[11.5px] text-[var(--faint)] md:flex-row md:justify-between">
                <span>© {new Date().getFullYear()} John Gibson · span closed with status ok</span>
                <span>Self-hosted · shipped with GitHub Actions</span>
              </footer>
            </section>
          </main>
        </div>

        <Drawer p={selected} onClose={close} />
        <ConceptSwitcher />
      </div>
    </MotionConfig>
  );
}
