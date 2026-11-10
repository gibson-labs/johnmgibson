import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Bike, Check, Copy, FileText, Github, GraduationCap, Linkedin, Server, Waves, X } from "lucide-react";
import { PROFILE, PROJECTS, STACK, TIMELINE, type ConceptProject } from "../content";
import { useConceptPage } from "../shared/useConceptPage";
import Reveal from "../shared/Reveal";
import PipelineDiagram from "../shared/PipelineDiagram";
import ConceptSwitcher from "../shared/ConceptSwitcher";

// Concept C — "Bento": warm-gray canvas, soft tiles, ink + one cobalt accent.
const C = {
  canvas: "#E9E7E2",
  tile: "#F8F7F4",
  ink: "#111112",
  muted: "#6B6A66",
  line: "rgba(17,17,18,0.08)",
  accent: "#2337FF",
  accentSoft: "#E2E5FF",
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
      className={`relative overflow-hidden rounded-[28px] ring-1 ring-[var(--line)] ${className}`}
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
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_10px_30px_-12px_rgba(17,17,18,0.3)] ring-1 ring-[var(--line)]">
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
      node="#FFFFFF"
      line="rgba(35,55,255,0.22)"
      text={C.ink}
      muted="#5D6290"
      accent={C.accent}
      font="'DM Mono', monospace"
      radius={10}
      className="w-full"
    />
  );
}

function Hero() {
  const time = useLocalTime(PROFILE.timezone);
  const marquee = STACK.flatMap((g) => g.items);
  const third = Math.ceil(marquee.length / 3);
  const rows = [marquee.slice(0, third), marquee.slice(third, third * 2), marquee.slice(third * 2)];

  return (
    <section className="grid gap-3 md:grid-cols-4">
      <Tile i={0} className="bg-[var(--ink)] p-7 text-white md:col-span-2 md:row-span-2 md:p-9">
        <div className="flex h-full min-h-[400px] flex-col justify-between gap-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C8BFF]" />
            <Label className="text-white/70">AI platform infrastructure</Label>
          </span>
          <div>
            <h1 className="text-[clamp(3.4rem,7vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
              John
              <br />
              Gibson
            </h1>
            <p className="mt-6 max-w-md text-[19px] leading-snug text-white/70">{PROFILE.positioning}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <CopyEmail className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] font-medium text-[var(--ink)] transition hover:bg-[#E2E5FF]" />
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-white ring-1 ring-white/20 transition hover:bg-white/10"
            >
              Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Tile>

      <Tile i={1} className="min-h-[380px] bg-[#D9D6CF] md:col-span-1 md:row-span-2">
        <img src={PROFILE.portrait} alt="John Gibson" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/75 px-3.5 py-2.5 backdrop-blur-md">
          <span className="text-[14px] font-medium">{PROFILE.location}</span>
          <span style={mono} className="text-[12px] text-[var(--muted)]">
            {time}
          </span>
        </div>
      </Tile>

      <Tile i={2} className="bg-[var(--accent)] p-6 text-white md:col-span-1">
        <div className="flex h-full min-h-[190px] flex-col justify-between gap-6">
          <Label className="text-white/70">Now</Label>
          <p className="text-[19px] font-medium leading-snug tracking-[-0.01em]">
            Platform engineering for the internal AI tools 800+ MasterControl employees use.
          </p>
          <Label className="text-white/60">Since Nov 2025</Label>
        </div>
      </Tile>

      <Tile i={3} className="bg-[var(--tile)] p-6 md:col-span-1">
        <div className="grid h-full min-h-[190px] grid-rows-2 divide-y divide-[rgba(17,17,18,0.08)]">
          {[
            ["20+", "models behind one gateway"],
            ["15+", "AWS CDK stacks shipped"],
          ].map(([n, l]) => (
            <div key={n} className="flex flex-col justify-center py-2">
              <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em]">{n}</span>
              <span className="mt-1 text-[14px] text-[var(--muted)]">{l}</span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile i={4} className="bg-[var(--tile)] py-6 md:col-span-2">
        <Label className="px-6 text-[var(--muted)]">Toolkit</Label>
        <div
          className="mt-5 space-y-2.5"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          {rows.map((row, r) => (
            <div key={r} className="flex overflow-hidden">
              <div className={`bento-marquee flex shrink-0 gap-2 pr-2 ${r === 1 ? "bento-marquee-rev" : ""}`}>
                {[...row, ...row].map((item, k) => (
                  <span key={`${item}-${k}`} className="whitespace-nowrap rounded-full bg-[var(--canvas)] px-3.5 py-1.5 text-[14px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Tile>

      <Tile i={5} className="bg-[var(--tile)] p-6 md:col-span-1">
        <Label className="text-[var(--muted)]">Off the clock</Label>
        <ul className="mt-5 space-y-3 text-[15px]">
          {[
            { icon: Bike, label: "Mountain biking" },
            { icon: Waves, label: "Scuba diving" },
            { icon: Server, label: "Homelab tinkering" },
          ].map(({ icon: I, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--canvas)]">
                <I className="h-4 w-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Tile>

      <Tile i={6} className="grid grid-cols-2 gap-1.5 bg-[var(--tile)] p-1.5 md:col-span-1">
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
            className="group flex min-h-[86px] flex-col justify-between rounded-[22px] bg-[var(--canvas)] p-3.5 transition-colors hover:bg-[var(--ink)] hover:text-white"
          >
            <I className="h-4 w-4" />
            <span className="text-[14px] font-medium">{label}</span>
          </a>
        ))}
      </Tile>
    </section>
  );
}

function SectionHead({ title, aside, id }: { title: string; aside: string; id: string }) {
  return (
    <Reveal className="mb-6 mt-24 flex items-end justify-between px-1 md:mt-32">
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
      {PROJECTS.map((p, i) => {
        const featured = p.diagram;
        return (
          <Reveal key={p.slug} delay={(i % 3) * 0.06} className={SPANS[p.slug]}>
            <button
              onClick={() => onOpen(p)}
              className={`group relative flex h-full w-full overflow-hidden rounded-[28px] bg-[var(--tile)] p-6 text-left ring-1 ring-[var(--line)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(17,17,18,0.35)] md:p-8 ${
                featured ? "flex-col gap-8 md:grid md:grid-cols-[1fr_1.4fr] md:items-center" : "flex-col"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    style={mono}
                    className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] ${
                      featured ? "bg-[var(--accent)] text-white" : "bg-[var(--canvas)] text-[var(--muted)]"
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
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                {featured && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} style={mono} className="rounded-full bg-[var(--canvas)] px-2.5 py-1 text-[11px]">
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
      <span className="absolute bottom-0 left-5 top-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#2337FF] via-[rgba(17,17,18,0.15)] to-transparent md:left-1/2" />
      {TIMELINE.map((r, i) => {
        const left = i % 2 === 0;
        const isEdu = r.kind === "education";
        return (
          <li key={r.id} className="relative grid grid-cols-1 pb-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
            <span className="absolute left-5 top-8 grid -translate-x-1/2 place-items-center md:left-1/2">
              {r.current && <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#2337FF] opacity-40" />}
              <span
                className={`relative h-4 w-4 rounded-full border-[3px] border-[var(--canvas)] ${
                  r.current ? "bg-[var(--accent)]" : isEdu ? "bg-[var(--muted)]" : "bg-[var(--ink)]"
                }`}
              />
            </span>

            <Reveal className={left ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"} y={24}>
              <article className="rounded-[24px] bg-[var(--tile)] p-6 ring-1 ring-[var(--line)] md:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[12px] font-semibold ${
                      r.current ? "bg-[var(--accent)] text-white" : "bg-[var(--ink)] text-white"
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
                      <span key={s} style={mono} className="rounded-full bg-[var(--canvas)] px-2.5 py-1 text-[11px]">
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
                <span className="block text-[5rem] font-semibold leading-none tracking-[-0.06em] text-[rgba(17,17,18,0.1)]">{r.year}</span>
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
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[var(--tile)] p-6 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--canvas)] hover:bg-[var(--ink)] hover:text-white"
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
              {p.diagram ? (
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

            <div className="mt-8 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} style={mono} className="rounded-full bg-[var(--canvas)] px-2.5 py-1 text-[11px]">
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
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-[14px] font-medium text-white hover:bg-[var(--accent)]"
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
  useConceptPage({ title: "John Gibson — Concept C · Bento", fonts: FONTS, background: C.canvas });
  const [selected, setSelected] = useState<ConceptProject | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const vars = {
    "--canvas": C.canvas,
    "--tile": C.tile,
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
        @keyframes bento-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bento-marquee { animation: bento-marquee 40s linear infinite; }
        .bento-marquee-rev { animation-direction: reverse; }
        @media (prefers-reduced-motion: reduce) { .bento-marquee { animation: none; } }
      `}</style>
      <div style={vars} className="min-h-screen selection:bg-[#2337FF] selection:text-white">
        <header className="sticky top-3 z-40 px-3">
          <div
            className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full py-2 pl-2 pr-2 ring-1 ring-[var(--line)] backdrop-blur-md"
            style={{ backgroundColor: "rgba(248,247,244,0.78)" }}
          >
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-[12px] font-semibold text-white">JG</span>
              <span className="text-[16px] font-semibold tracking-[-0.02em]">John Gibson</span>
            </a>
            <nav className="flex items-center gap-1 text-[15px]">
              {[
                ["#work", "Work"],
                ["#path", "Path"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="hidden rounded-full px-3.5 py-2 text-[var(--muted)] transition-colors hover:bg-[var(--canvas)] hover:text-[var(--ink)] sm:inline">
                  {label}
                </a>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--accent)]"
              >
                Résumé <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </header>

        <main id="top" className="mx-auto max-w-[1240px] px-3 pb-10 pt-6 md:px-3">
          <Hero />

          <SectionHead id="work" title="Selected work" aside={`(${String(PROJECTS.length).padStart(2, "0")})`} />
          <Work onOpen={setSelected} />

          <SectionHead id="path" title="The path so far" aside="2023 — now" />
          <Path />

          <Reveal className="mt-24 md:mt-32">
            <section id="contact" className="scroll-mt-28 rounded-[32px] bg-[var(--ink)] p-8 text-white md:p-14">
              <Label className="text-white/50">Contact</Label>
              <h2 className="mt-6 text-[clamp(2.6rem,6.5vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                Got an AI platform problem?
                <br />
                <span className="text-white/35">Let&apos;s talk.</span>
              </h2>
              <div className="mt-10 flex flex-wrap gap-2.5">
                <CopyEmail
                  label={PROFILE.email}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[16px] font-medium text-[var(--ink)] transition hover:bg-[#E2E5FF]"
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
        <ConceptSwitcher />
      </div>
    </MotionConfig>
  );
}
