import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Bike, Check, Copy, FileText, Github, GraduationCap, Linkedin, Moon, Server, Sun, Waves, X } from "lucide-react";
import { PROFILE, PROJECTS, WORK_PROJECTS, isWorkProject, STACK, TIMELINE, type ConceptProject } from "../content";
import { useConceptPage } from "../shared/useConceptPage";
import Reveal from "../shared/Reveal";
import PipelineDiagram from "../shared/PipelineDiagram";
import ArchDiagram from "../shared/ArchDiagram";
import ConceptSwitcher from "../shared/ConceptSwitcher";
import CareerOverview from "./CareerOverview";

// One Bento layout, with distinct light and night palettes.
const LIGHT = {
  project: "#E9EAF5", projectHover: "#E1E3F1", diagramAccent: "#9DBBFF", diagramLine: "#8A9AAF", diagramText: "#25364E", diagramMuted: "#C0CAD8", diagramNodeMuted: "#4C607D", diagramHighlight: "#45546A", diagramHighlightText: "#F0F4FC", now: "#354FE0", onNow: "#FFFFFF", canvas: "#CBD2DC", tile: "#FFFFFF", inset: "#EDF1FC", diagram: "#34383F", node: "#E1E8F3", ink: "#202321", muted: "#5D6672",
  line: "rgba(37,53,77,0.16)", accent: "#354FE0", accentSoft: "#E9EEFF",
  tint: "#F1F2FE", sage: "#F0F7F3", hero: "#202321", onAccent: "#FFFFFF", onInk: "#FFFFFF",
  header: "rgba(255,255,255,0.88)", year: "rgba(32,35,33,0.18)",
};
const DARK = {
  project: "#202730", projectHover: "#263343", diagramAccent: "#82B2F4", diagramLine: "#4F6C90", diagramText: "#E4EDFA", diagramMuted: "#ADC0D8", diagramNodeMuted: "#ADC0D8", diagramHighlight: "#243D59", diagramHighlightText: "#E4EDFA", now: "#513930", onNow: "#F7D6C6", canvas: "#11161D", tile: "#252D37", inset: "#2B3542", diagram: "#17283D", node: "#243D59", ink: "#E9EDF3", muted: "#ADB8C6",
  line: "rgba(210,224,244,0.11)", accent: "#F2A17F", accentSoft: "#3D302C",
  tint: "#262C3D", sage: "#22332F", hero: "#171E27", onAccent: "#201710", onInk: "#191B1E",
  header: "rgba(28,35,45,0.92)", year: "rgba(243,241,236,0.22)",
};
const FONTS = "family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Mono:wght@400;500";
const mono: CSSProperties = { fontFamily: "'DM Mono', monospace" };
const EASE = [0.22, 1, 0.36, 1] as const;

const SPANS: Record<string, string> = {
  "ai-gateway": "md:col-span-6",
  "homelab-monitor": "md:col-span-2",
  "billing-platform": "md:col-span-4",
  cineniche: "md:col-span-3",
  "turtle-shelter": "md:col-span-3",
};

const ORG_BADGE: Record<string, string> = {
  mastercontrol: "MC",
  "print-mail": "PM",
  oit: "OIT",
};

function useLocalTime(timeZone: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(now);
}

function CopyEmail({ className, label = "Copy email" }: { className: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <button onClick={copy} className={className}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function Tile({ i, className = "", children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.08 * i, ease: EASE }}
      className={`bento-surface relative overflow-hidden rounded-[28px] ring-1 ring-[var(--line)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span style={mono} className={`text-[11px] uppercase tracking-[0.14em] ${className}`}>
      {children}
    </span>
  );
}

function BrowserFrame({ src, slug }: { src: string; slug: string }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-[var(--tile)] shadow-[0_10px_30px_-12px_rgba(17,17,18,0.3)] ring-1 ring-[var(--line)]">
      <div className="flex h-7 items-center gap-1.5 border-b border-[rgba(17,17,18,0.06)] px-3">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2 w-2 rounded-full bg-[#DEDCD6]" />
        ))}
        <span style={mono} className="ml-3 truncate text-[10px] text-[#A5A39D]">
          {slug}
        </span>
      </div>
      <img src={src} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

function Diagram() {
  return (
    <PipelineDiagram
      node="var(--node)"
      line="var(--line)"
      text="var(--ink)"
      muted="var(--muted)"
      accent="var(--accent)"
      font="'DM Mono', monospace"
      radius={10}
      className="w-full"
    />
  );
}

function WorkDiagram({ p }: { p: ConceptProject }) {
  if (!isWorkProject(p)) return null;
  return <ArchDiagram diagram={p.diagramKey} node="var(--node)" line="var(--diagramLine)" text="var(--diagramText)" muted="var(--diagramMuted)" accent="var(--diagramAccent)" nodeMuted="var(--diagramNodeMuted)" highlightNode="var(--diagramHighlight)" highlightText="var(--diagramHighlightText)" font="'DM Mono', monospace" radius={8} className="w-full" />;
}

function Hero() {
  const time = useLocalTime(PROFILE.timezone);
  const marquee = STACK.flatMap((g) => g.items);
  const third = Math.ceil(marquee.length / 3);
  const rows = [marquee.slice(0, third), marquee.slice(third, third * 2), marquee.slice(third * 2)];

  return (
    <section className="grid gap-3 md:grid-cols-4">
      <Tile i={0} className="bento-hero bg-[var(--hero)] p-6 text-white md:col-span-2 md:row-span-2 md:p-9">
        <div className="flex h-full flex-col justify-between gap-6 md:min-h-[400px] md:gap-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <Label className="text-[9px] text-white/70 md:text-[11px]">AI platform infrastructure</Label>
          </span>
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-[clamp(3rem,12vw,3.4rem)] font-semibold leading-[0.92] tracking-[-0.045em] md:text-[clamp(3.4rem,7vw,6.2rem)] md:leading-[0.88]">
                John<br />Gibson
              </h1>
              <div className="shrink-0 md:hidden">
                <div className="h-[96px] w-[74px] min-[360px]:h-[106px] min-[360px]:w-[90px] overflow-hidden rounded-[20px] ring-1 ring-white/15">
                  <img src={PROFILE.portrait} alt="John Gibson" className="h-full w-full scale-[1.25] object-cover object-[center_35%]" />
                </div>
                <p style={mono} className="mt-2 text-center text-[10px] text-white/60">{PROFILE.location}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[17px] leading-snug text-white/70 md:mt-6 md:text-[19px]">{PROFILE.positioning}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <CopyEmail className="inline-flex items-center gap-2 rounded-full bg-[var(--tile)] px-5 py-2.5 text-[15px] font-medium text-[var(--ink)] transition hover:bg-[var(--accentSoft)]" />
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-white ring-1 ring-white/20 transition hover:bg-white/10"
            >
              Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="border-t border-white/15 pt-4 md:hidden">
            <p className="text-[13px] leading-relaxed text-white/75"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />Currently building internal AI tools used by <span className="font-medium text-white">400+ employees daily.</span></p>
          </div>
        </div>
      </Tile>

      <Tile i={1} className="hidden min-h-[380px] md:block bg-[#D9D6CF] md:col-span-1 md:row-span-2">
        <img src={PROFILE.portrait} alt="John Gibson" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-[var(--header)] px-3.5 py-2.5 backdrop-blur-md">
          <span className="text-[14px] font-medium">{PROFILE.location}</span>
          <span style={mono} className="text-[12px] text-[var(--muted)]">
            {time}
          </span>
        </div>
      </Tile>

      <Tile i={2} className="hidden bg-[var(--now)] md:block p-6 text-[var(--onNow)] md:col-span-1">
        <div className="flex h-full min-h-[190px] flex-col justify-between gap-6">
          <Label>Now</Label>
          <p className="text-[19px] font-medium leading-snug tracking-[-0.01em]">
            Platform engineering for internal AI tools used by 400+ employees daily.
          </p>
          <Label>Since Nov 2025</Label>
        </div>
      </Tile>

      <Tile i={3} className="hidden bg-[var(--tint)] md:block p-6 md:col-span-1">
        <div className="flex h-full min-h-[190px] flex-col justify-between gap-5">
          <Label className="text-[var(--muted)]">What I build</Label>
          <p className="text-[21px] font-medium leading-snug tracking-[-0.02em]">Reliable infrastructure for useful AI.</p>
          <p className="text-[14px] text-[var(--muted)]">Cloud · AI platforms · Automation</p>
        </div>
      </Tile>

      <Tile i={4} className="bento-toolkit hidden bg-[var(--tint)] md:block py-6 md:col-span-2">
        <Label className="px-6 text-[var(--muted)]">Toolkit</Label>
        <div
          className="mt-5 space-y-2.5"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          {rows.map((row, r) => (
            <div key={r} className="flex overflow-hidden">
              <div className={`bento-marquee flex shrink-0 gap-2 pr-2 ${r === 1 ? "bento-marquee-rev" : ""}`}>
                {[...row, ...row].map((item, k) => (
                  <span key={`${item}-${k}`} className="whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--inset)] px-3.5 py-1.5 text-[14px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Tile>

      <Tile i={5} className="hidden bg-[var(--sage)] md:block p-6 md:col-span-1">
        <Label className="text-[var(--muted)]">Off the clock</Label>
        <ul className="mt-5 space-y-3 text-[15px]">
          {[
            { icon: Bike, label: "Mountain biking" },
            { icon: Waves, label: "Scuba diving" },
            { icon: Server, label: "Homelab tinkering" },
          ].map(({ icon: I, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--inset)]">
                <I className="h-4 w-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Tile>

      <Tile i={6} className="hidden grid-cols-2 md:grid gap-1.5 bg-[var(--tile)] p-1.5 md:col-span-1">
        {[
          { icon: Github, label: "GitHub", href: PROFILE.github },
          { icon: Linkedin, label: "LinkedIn", href: PROFILE.linkedin },
          { icon: FileText, label: "Résumé", href: PROFILE.resume },
          { icon: ArrowUpRight, label: "Email", href: `mailto:${PROFILE.email}` },
        ].map(({ icon: I, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex min-h-[86px] flex-col justify-between rounded-[22px] bg-[var(--inset)] p-3.5 transition-colors hover:bg-[var(--ink)] hover:text-[var(--onInk)]"
          >
            <I className="h-4 w-4" />
            <span className="text-[14px] font-medium">{label}</span>
          </a>
        ))}
      </Tile>

      <Tile i={1} className="bg-[var(--tint)] p-5 md:hidden">
        <Label className="text-[var(--muted)]">Toolkit</Label>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["AWS", "CDK", "Python", "TypeScript", "LiteLLM", "Open WebUI"].map((item) => (
            <span key={item} className="rounded-full border border-[var(--line)] bg-[var(--tile)] px-2.5 py-1 text-[12px]">{item}</span>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--muted)]">Off the clock: mountain biking, scuba diving &amp; homelab tinkering.</p>
        <div className="mt-4 flex items-center gap-5 border-t border-[var(--line)] pt-3">
          {[
            { icon: Github, label: "GitHub", href: PROFILE.github },
            { icon: Linkedin, label: "LinkedIn", href: PROFILE.linkedin },
          ].map(({icon: Icon, label, href}) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--accent)]">
              <Icon aria-hidden="true" className="h-3.5 w-3.5" />{label}<ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </a>
          ))}
        </div>
      </Tile>
    </section>
  );
}

function SectionHead({ title, aside, id }: { title: string; aside: string; id: string }) {
  return (
    <Reveal className="mb-6 mt-16 flex items-end justify-between px-1 md:mt-32">
      <h2 id={id} className="scroll-mt-28 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.045em]">
        {title}
      </h2>
      <span style={mono} className="pb-2 text-[12px] text-[var(--muted)]">
        {aside}
      </span>
    </Reveal>
  );
}

function Work({ onOpen }: { onOpen: (p: ConceptProject) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-6">
      {WORK_PROJECTS.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.08} className="md:col-span-3">
          <button onClick={() => onOpen(p)} className="bento-surface bento-project group flex h-full w-full flex-col rounded-[28px] bg-[var(--project)] p-6 text-left ring-1 ring-[var(--line)] transition hover:-translate-y-1 md:p-8">
            <Label className="text-[var(--accent)]">{p.kind} · {p.context}</Label>
            <h3 className="mt-4 flex min-h-[2.5em] items-start justify-between gap-3 text-[1.9rem] font-semibold leading-tight"><span>{p.title}</span><ArrowUpRight aria-hidden="true" className="mt-1.5 h-5 w-5 shrink-0 text-[var(--accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></h3>
            <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
            <div className="bento-diagram mt-6 w-full rounded-[16px] bg-[var(--diagram)] p-3 ring-1 ring-[var(--line)]"><WorkDiagram p={p} /></div>
            <div className="mt-6 grid w-full grid-cols-2 gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-4">{p.highlights.map((h) => <div key={h.label}><div className="text-[1.5rem] font-semibold">{h.value}</div><div className="text-[12px] text-[var(--muted)]">{h.label}</div></div>)}</div>
          </button>
        </Reveal>
      ))}
      {PROJECTS.filter((p) => p.slug !== "ai-gateway").map((p, i) => {
        const featured = p.diagram;
        return (
          <Reveal key={p.slug} delay={(i % 3) * 0.06} className={SPANS[p.slug]}>
            <button
              onClick={() => onOpen(p)}
              className={`bento-surface bento-project group relative flex h-full w-full overflow-hidden rounded-[28px] bg-[var(--project)] p-6 text-left ring-1 ring-[var(--line)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(17,17,18,0.35)] md:p-8 ${
                featured ? "flex-col gap-8 md:grid md:grid-cols-[1fr_1.4fr] md:items-center" : "flex-col"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    style={mono}
                    className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] ${
                      featured ? "bg-[var(--accent)] text-[var(--onAccent)]" : "bg-[var(--inset)] text-[var(--muted)]"
                    }`}
                  >
                    {p.kind}
                  </span>
                  <span style={mono} className="text-[12px] text-[var(--muted)]">
                    {p.context} · {p.year}
                  </span>
                </div>
                <h3
                  className={`mt-4 flex items-start gap-2 font-semibold leading-[1.05] tracking-[-0.03em] ${
                    featured ? "text-[2.2rem] md:text-[2.6rem]" : "text-[1.6rem]"
                  }`}
                >
                  {p.title}
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--accent)] opacity-70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                {featured && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} style={mono} className="rounded-full bg-[var(--inset)] px-2.5 py-1 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {featured ? (
                <div className="rounded-[20px] bg-[var(--accentSoft)] p-4 md:p-5">
                  <Diagram />
                </div>
              ) : (
                p.image && (
                  <div className="-mb-14 mt-8 translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                    <BrowserFrame src={p.image} slug={p.slug} />
                  </div>
                )
              )}
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

function Path() {
  return (
    <ol className="relative mx-auto max-w-5xl">
      <span className="absolute bottom-0 left-5 top-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[var(--line)] to-transparent md:left-1/2" />
      {TIMELINE.map((r, i) => {
        const left = i % 2 === 0;
        const isEdu = r.kind === "education";
        return (
          <li key={r.id} className="relative grid grid-cols-1 pb-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
            <span className="absolute left-5 top-8 grid -translate-x-1/2 place-items-center md:left-1/2">
              {r.current && <span className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--accent)] opacity-40" />}
              <span
                className={`relative h-4 w-4 rounded-full border-[3px] border-[var(--canvas)] ${
                  r.current ? "bg-[var(--accent)]" : isEdu ? "bg-[var(--muted)]" : "bg-[var(--ink)]"
                }`}
              />
            </span>

            <Reveal className={left ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"} y={24}>
              <article className="bento-surface rounded-[24px] bg-[var(--tile)] p-6 ring-1 ring-[var(--line)] md:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[12px] font-semibold ${
                      r.current ? "bg-[var(--accent)] text-[var(--onAccent)]" : "bg-[var(--ink)] text-[var(--onInk)]"
                    }`}
                  >
                    {isEdu ? <GraduationCap className="h-4 w-4" /> : ORG_BADGE[r.id]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium">{r.org}</p>
                    <p className="truncate text-[13px] text-[var(--muted)]">{r.location}</p>
                  </div>
                  {r.current && (
                    <span style={mono} className="ml-auto rounded-full bg-[var(--accentSoft)] px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
                      Current
                    </span>
                  )}
                </div>
                <p style={mono} className="mt-5 text-[12px] text-[var(--muted)] md:hidden">
                  {r.period}
                </p>
                <h3 className="mt-2 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] md:mt-5">{r.role}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--muted)]">{r.summary}</p>
                {r.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {r.stack.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {r.stack.map((s) => (
                      <span key={s} style={mono} className="rounded-full bg-[var(--inset)] px-2.5 py-1 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>

            {/* Opposite side carries the date, so the zigzag never leaves a dead half */}
            <div
              className={`hidden pt-5 md:row-start-1 md:flex md:flex-col ${
                left ? "md:col-start-2 md:items-start" : "md:col-start-1 md:items-end md:text-right"
              }`}
            >
              <Reveal>
                <span className="block text-[5rem] font-semibold leading-none tracking-[-0.06em] text-[var(--year)]">{r.year}</span>
                <span style={mono} className="mt-2 block text-[12px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {r.period}
                </span>
              </Reveal>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ProjectSheet({ p, onClose }: { p: ConceptProject | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(17,17,18,0.45)] p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label={p.title}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="bento-surface relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[var(--tile)] p-6 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--inset)] hover:bg-[var(--ink)] hover:text-[var(--onInk)]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <span style={mono} className="text-[12px] text-[var(--muted)]">
              {p.kind} · {p.context} · {p.year} · {p.role}
            </span>
            <h2 className="mt-3 pr-12 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em]">{p.title}</h2>
            <p className="mt-3 text-[17px] text-[var(--muted)]">{p.summary}</p>

            <div className="mt-8">
              {isWorkProject(p) ? (
                <div className="bento-diagram rounded-[20px] bg-[var(--diagram)] p-4"><WorkDiagram p={p} /></div>
              ) : p.diagram ? (
                <div className="rounded-[20px] bg-[var(--accentSoft)] p-4">
                  <Diagram />
                </div>
              ) : (
                p.image && <BrowserFrame src={p.image} slug={p.slug} />
              )}
              {p.note && (
                <p style={mono} className="mt-2 text-[11px] text-[var(--muted)]">
                  {p.note}
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {(
                [
                  ["Problem", p.problem],
                  ["Approach", p.approach],
                  ["Outcome", p.outcome],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <Label className="text-[var(--accent)]">{k}</Label>
                  <p className="mt-2 text-[15px] leading-relaxed">{v}</p>
                </div>
              ))}
            </div>

            {isWorkProject(p) && <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-[var(--inset)] p-4 sm:grid-cols-4">{p.highlights.map((h) => <div key={h.label}><p className="text-[22px] font-semibold">{h.value}</p><p className="text-[12px] text-[var(--muted)]">{h.label}</p></div>)}</div>}
            {isWorkProject(p) && <div className="mt-8"><Label className="text-[var(--accent)]">Contributions</Label><ul className="mt-3 list-disc space-y-2 pl-5 text-[15px]">{p.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div>}

            <div className="mt-8 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} style={mono} className="rounded-full bg-[var(--inset)] px-2.5 py-1 text-[11px]">
                  {s}
                </span>
              ))}
            </div>

            {p.gallery && p.gallery.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {p.gallery.map((g) => (
                  <img key={g} src={g} alt="" className="aspect-[16/10] w-full rounded-xl object-cover object-top ring-1 ring-[var(--line)]" />
                ))}
              </div>
            )}

            {p.links && (
              <div className="mt-8 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-[14px] font-medium text-[var(--onInk)] hover:bg-[var(--accent)] hover:text-[var(--onAccent)]"
                  >
                    {l.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Bento() {
  const isConcept = useLocation().pathname.startsWith("/concepts");
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("bento-theme") === "dark"; } catch { return false; }
  });
  const C = dark ? DARK : LIGHT;
  useConceptPage({ title: isConcept ? "John Gibson — Concept C · Bento" : "John Gibson — Cloud Engineer", fonts: FONTS, background: LIGHT.canvas });
  useEffect(() => {
    document.body.style.backgroundColor = C.canvas;
    try { localStorage.setItem("bento-theme", dark ? "dark" : "light"); } catch { /* Storage may be unavailable. */ }
  }, [dark, C.canvas]);
  const [pathView, setPathView] = useState<"overview" | "full">("overview");
  const [selected, setSelected] = useState<ConceptProject | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const vars = {
    "--careerGold": dark ? "#E9B754" : "#9A650D",
    "--careerBlue": dark ? "#7BAAFF" : "#3B65C2",
    "--careerGreen": dark ? "#72CAB0" : "#297A62",
    "--hero": C.hero,
    "--onAccent": C.onAccent,
    "--onInk": C.onInk,
    "--header": C.header,
    "--year": C.year,
    colorScheme: dark ? "dark" : "light",
    "--canvas": C.canvas,
    "--tile": C.tile,
    "--project": C.project,
    "--projectHover": C.projectHover,
    "--diagramAccent": C.diagramAccent,
    "--diagramLine": C.diagramLine,
    "--diagramText": C.diagramText,
    "--diagramMuted": C.diagramMuted,
    "--diagramNodeMuted": C.diagramNodeMuted,
    "--diagramHighlight": C.diagramHighlight,
    "--diagramHighlightText": C.diagramHighlightText,
    "--now": C.now,
    "--onNow": C.onNow,
    "--inset": C.inset,
    "--tint": C.tint,
    "--sage": C.sage,
    "--diagram": C.diagram,
    "--node": C.node,
    "--ink": C.ink,
    "--muted": C.muted,
    "--line": C.line,
    "--accent": C.accent,
    "--accentSoft": C.accentSoft,
    backgroundColor: C.canvas,
    color: C.ink,
    fontFamily: "'Bricolage Grotesque', sans-serif",
  } as CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        [data-bento-theme="light"] {
          background-image: radial-gradient(ellipse at 85% 0%, rgba(53,79,224,0.045), transparent 60%);
          background-attachment: fixed;
        }
        [data-bento-theme="light"] .bento-surface {
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 2px 4px rgba(37,53,77,0.035), 0 12px 28px -16px rgba(37,53,77,0.30);
        }
        [data-bento-theme="light"] .bento-hero {
          background-image: linear-gradient(135deg, rgba(255,255,255,0.035), transparent 65%);
        }
        [data-bento-theme="dark"] {
          background-image: radial-gradient(ellipse at 85% 0%, rgba(255,129,89,0.07), transparent 650px);
        }
        [data-bento-theme="dark"] .bento-surface {
          background-image: linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 55%);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 32px -22px rgba(0,0,0,0.6);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        [data-bento-theme="dark"] .bento-hero {
          background-image: radial-gradient(ellipse at top right, rgba(255,129,89,0.09), transparent 65%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%);
        }
        [data-bento-theme] .bento-project { transition: background-color 180ms ease, transform 180ms ease; }
        [data-bento-theme] .bento-project:hover { background-color: var(--projectHover); }
        [data-bento-theme="dark"] .bento-hero button {
          background-color: var(--accentSoft);
          color: var(--accent);
        }
        [data-bento-theme] .bento-diagram {
          background-image: radial-gradient(var(--line) 0.7px, transparent 0.7px);
          background-size: 12px 12px;
        }
        [data-bento-theme="light"] .bento-diagram { background-image: none; }
        [data-bento-theme="light"] .bento-project {
          --line: rgba(58, 67, 109, 0.12);
          --inset: #DEE2F1;
        }
        [data-bento-theme] :is(a, button):focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        [data-bento-theme] .bento-marquee:focus-within,
        [data-bento-theme] .bento-toolkit:hover .bento-marquee { animation-play-state: paused; }
        @keyframes bento-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bento-marquee { animation: bento-marquee 40s linear infinite; }
        .bento-marquee-rev { animation-direction: reverse; }
        @media (prefers-reduced-motion: reduce) { .bento-marquee { animation: none; } [data-bento-theme] .bento-project, [data-bento-theme] .bento-project * { transition: none; transform: none; } }
      `}</style>
      <div style={vars} data-bento-theme={dark ? "dark" : "light"} className="min-h-screen selection:bg-[var(--accent)] selection:text-white">
        <header className="sticky top-3 z-40 px-3">
          <div
            className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full py-2 pl-2 pr-2 ring-1 ring-[var(--line)] backdrop-blur-md"
            style={{ backgroundColor: C.header }}
          >
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-[12px] font-semibold text-[var(--onInk)]">JG</span>
              <span className="hidden text-[16px] font-semibold tracking-[-0.02em] sm:inline">John Gibson</span>
            </a>
            <nav className="flex items-center gap-1 text-[15px]">
              {[
                ["#work", "Work"],
                ["#path", "Path"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="hidden rounded-full px-3.5 py-2 text-[var(--muted)] transition-colors hover:bg-[var(--inset)] hover:text-[var(--ink)] sm:inline">
                  {label}
                </a>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 font-medium text-[var(--onInk)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--onAccent)]"
              >
                Résumé <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                role="switch"
                aria-checked={dark}
                aria-label="Dark mode"
                onClick={() => setDark((value) => !value)}
                className="ml-2 inline-flex min-h-10 items-center gap-1 rounded-full bg-[var(--inset)] p-1 ring-1 ring-[var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-medium ${!dark ? "bg-[var(--tile)] text-[var(--ink)] shadow-sm" : "text-[var(--muted)]"}`}>
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden min-[360px]:inline">Light</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-medium ${dark ? "bg-[var(--accent)] text-[var(--onAccent)] shadow-sm" : "text-[var(--muted)]"}`}>
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden min-[360px]:inline">Dark</span>
                </span>
              </button>
            </nav>
          </div>
        </header>

        <main id="top" className="scroll-mt-24 mx-auto max-w-[1240px] px-3 pb-10 pt-6 md:px-3">
          <Hero />

          <SectionHead id="work" title="Selected work" aside={`(${String(WORK_PROJECTS.length + PROJECTS.length - 1).padStart(2, "0")})`} />
          <Work onOpen={setSelected} />

          <SectionHead id="path" title="The path so far" aside="2021 — now" />
          <div className="mb-6 flex justify-start sm:justify-end" role="group" aria-label="Career timeline view">
            <div className="inline-flex gap-1 rounded-full bg-[var(--tile)] p-1 ring-1 ring-[var(--line)]">
              {([["overview", "Overview"], ["full", "Full timeline"]] as const).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={pathView === value} aria-controls="career-view" onClick={() => setPathView(value)}
                  className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${pathView === value ? "bg-[var(--accent)] text-[var(--onAccent)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div id="career-view">{pathView === "overview" ? <CareerOverview /> : <Path />}</div>

          <Reveal className="mt-24 md:mt-32">
            <section id="contact" className="bento-surface bento-hero scroll-mt-28 rounded-[32px] bg-[var(--hero)] p-8 text-white md:p-14">
              <Label className="text-white/50">Contact</Label>
              <h2 className="mt-6 text-[clamp(2.6rem,6.5vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-white/70">Have a project, opportunity, or idea? I&apos;d love to hear about it.</p>
              <div className="mt-10 flex flex-wrap gap-2.5">
                <CopyEmail
                  label={PROFILE.email}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--tile)] px-5 py-3 text-[16px] font-medium text-[var(--ink)] transition hover:bg-[var(--accentSoft)]"
                />
                {[
                  ["LinkedIn", PROFILE.linkedin],
                  ["GitHub", PROFILE.github],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[16px] font-medium ring-1 ring-white/20 transition hover:bg-white/10"
                  >
                    {label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          </Reveal>

          <footer style={mono} className="flex flex-col gap-1 px-2 pb-20 pt-8 text-[11px] text-[var(--muted)] md:flex-row md:justify-between">
            <span>© {new Date().getFullYear()} John Gibson</span>
            <span>Set in Bricolage Grotesque &amp; DM Mono · self-hosted, shipped with GitHub Actions</span>
          </footer>
        </main>

        <ProjectSheet p={selected} onClose={close} />
        {isConcept && <ConceptSwitcher />}
      </div>
    </MotionConfig>
  );
}
