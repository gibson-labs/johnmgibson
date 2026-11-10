import { createContext, useCallback, useContext, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Github, GraduationCap, Linkedin, Mail, X } from "lucide-react";
import {
  HOMELAB_STATUS,
  PROFILE,
  PROJECTS_V2,
  STACK,
  TIMELINE,
  WORK_PROJECTS,
  isWorkProject,
  type ConceptProject,
} from "../content";
import { useConceptPage } from "../shared/useConceptPage";
import { useCopyEmail, useLocalTime, useModal } from "../shared/hooks";
import Reveal from "../shared/Reveal";
import ArchDiagram from "../shared/ArchDiagram";
import ConceptSwitcher from "../shared/ConceptSwitcher";

// Concept D — "Bento Night": Bento's tiles on a graphite control-room palette, one coral signal.
// Colors come from a theme object so the layout can later take a light (Bento) palette for a day/night toggle.
interface NightTheme {
  title: string;
  bg: string;
  tile: string;
  tile2: string;
  line: string;
  line2: string;
  text: string;
  muted: string;
  faint: string;
  soft: string;
  soft2: string;
  accent: string;
  onAccent: string;
  accentRing: string;
  glow: string;
  header: string;
  diagramLine: string;
  contactBtnText: string;
  onAccentLine: string;
  onAccentHover: string;
}

const NIGHT: NightTheme = {
  title: "Concept D · Bento Night",
  bg: "#0B0B0C",
  tile: "#141416",
  tile2: "#1B1B1E",
  line: "rgba(255,255,255,0.07)",
  line2: "rgba(255,255,255,0.12)",
  text: "#F2F1EE",
  muted: "#8F8E93",
  faint: "#5F5E63",
  soft: "#CFCED2",
  soft2: "#D6D5D9",
  accent: "#FF5B3A",
  onAccent: "#160704",
  accentRing: "rgba(255,91,58,0.5)",
  glow: "rgba(255,91,58,0.18)",
  header: "rgba(20,20,22,0.78)",
  diagramLine: "rgba(255,255,255,0.16)",
  contactBtnText: "#F2F1EE",
  onAccentLine: "rgba(22,7,4,0.25)",
  onAccentHover: "rgba(22,7,4,0.1)",
};

const ThemeCtx = createContext<NightTheme>(NIGHT);
const FONTS = "family=Instrument+Sans:wdth,wght@75..100,400..700&family=JetBrains+Mono:wght@400;500";
const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const EASE = [0.22, 1, 0.36, 1] as const;
const BARS = Array.from({ length: 28 }, (_, i) => 30 + Math.round(60 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.6))));
const OTHER_PROJECTS = PROJECTS_V2.filter((p) => !isWorkProject(p));

function Tile({ i = 0, className = "", children }: { i?: number; className?: string; children: ReactNode }) {
  // Tiles that pass their own bg-* keep it; everything else gets the default tile surface.
  const surface = className.includes("bg-") ? "" : "bg-[var(--tile)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.07 * i, ease: EASE }}
      className={`relative overflow-hidden rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-[var(--line)] ${surface} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span style={mono} className={`text-[11px] uppercase tracking-[0.16em] ${className}`}>
      {children}
    </span>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span style={mono} className="rounded-md bg-[var(--tile2)] px-2 py-1 text-[11px] text-[var(--muted)] ring-1 ring-[var(--line)]">
      {children}
    </span>
  );
}

function Diagram({ p }: { p: ConceptProject }) {
  const t = useContext(ThemeCtx);
  if (!isWorkProject(p)) return null;
  return (
    <ArchDiagram
      diagram={p.diagramKey}
      node={t.tile2}
      line={t.diagramLine}
      text={t.text}
      muted={t.muted}
      accent={t.accent}
      font="'JetBrains Mono', monospace"
      radius={8}
      className="w-full"
    />
  );
}

function Hero() {
  const t = useContext(ThemeCtx);
  const time = useLocalTime(PROFILE.timezone);
  const { copied, copy } = useCopyEmail();
  const tools = STACK.flatMap((g) => g.items);

  return (
    <section className="grid gap-3 md:grid-cols-4">
      <Tile i={0} className="p-7 md:col-span-3 md:p-10">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }}
        />
        <div className="relative flex h-full min-h-[340px] flex-col justify-between gap-10">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <Label className="text-[var(--muted)]">AI platform infrastructure · {PROFILE.location}</Label>
          </div>
          <div>
            <h1 className="text-[clamp(3.6rem,9vw,8.4rem)] font-semibold leading-[0.86] tracking-[-0.05em]">John Gibson</h1>
            <p className="mt-6 max-w-xl text-[19px] leading-snug text-[var(--muted)]">
              {PROFILE.positioning} <span className="text-[var(--text)]">Gateways, telemetry, and the tools agents use.</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[15px] font-semibold text-[var(--onAccent)] transition hover:brightness-110"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium ring-1 ring-[var(--line2)] transition hover:bg-white/5"
            >
              Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Tile>

      <Tile i={1} className="min-h-[360px] md:row-span-2">
        <img src={PROFILE.portrait} alt="John Gibson" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
          <div>
            <p className="text-[15px] font-semibold">{PROFILE.location}</p>
            <p style={mono} className="text-[12px] text-white/70">
              {time}
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { icon: Github, href: PROFILE.github, label: "GitHub" },
              { icon: Linkedin, href: PROFILE.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
            ].map(({ icon: I, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full bg-black/40 backdrop-blur transition hover:bg-[var(--accent)] hover:text-[var(--onAccent)]"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Tile>

      <Tile i={2} className="bg-[var(--accent)] p-6 text-[var(--onAccent)] ring-0">
        <div className="flex h-full min-h-[200px] flex-col justify-between gap-6">
          <Label className="text-[var(--onAccent)] opacity-70">Now</Label>
          <p className="text-[19px] font-semibold leading-snug tracking-[-0.01em]">
            Working on the AI gateway and chat platform 800+ MasterControl employees use.
          </p>
          <Label className="text-[var(--onAccent)] opacity-60">Since Nov 2025</Label>
        </div>
      </Tile>

      <Tile i={3} className="p-5">
        <div style={mono} className="flex h-full min-h-[200px] flex-col justify-between text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--muted)]">homelab.status</span>
            <span className="flex items-center gap-1.5 text-[#7CE38B]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7CE38B]" /> healthy
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="uppercase tracking-[0.14em] text-[var(--faint)]">services</div>
              <div className="mt-1 text-[22px] text-[var(--text)]">{HOMELAB_STATUS.services}</div>
            </div>
            <div>
              <div className="uppercase tracking-[0.14em] text-[var(--faint)]">uptime</div>
              <div className="mt-1 text-[22px] text-[var(--text)]">{HOMELAB_STATUS.uptime}</div>
            </div>
          </div>
          <div className="flex h-8 items-end gap-[3px]" aria-hidden>
            {BARS.map((h, k) => (
              <motion.span
                key={k}
                className="flex-1 rounded-[1px]"
                style={{ backgroundColor: k === BARS.length - 1 ? t.accent : "rgba(255,255,255,0.16)" }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 0.5 + k * 0.02, ease: EASE }}
              />
            ))}
          </div>
          <span className="text-[var(--faint)]">checked {HOMELAB_STATUS.lastCheck} by n8n</span>
        </div>
      </Tile>

      <Tile i={4} className="p-6">
        <Label className="text-[var(--muted)]">Toolkit</Label>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tools.slice(0, 12).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          <span style={mono} className="px-1 py-1 text-[11px] text-[var(--faint)]">
            +{tools.length - 12} more
          </span>
        </div>
      </Tile>

      <Tile i={5} className="grid grid-cols-2 gap-px bg-[var(--line)] md:col-span-4 md:grid-cols-4">
        {[
          ["800+", "employees on the platforms"],
          ["20+", "models I added to the gateway"],
          ["15+", "AWS CDK stacks shipped"],
          ["$70K+", "yearly labor saved at BYU"],
        ].map(([n, l]) => (
          <div key={n} className="bg-[var(--tile)] p-6">
            <div className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em]">{n}</div>
            <div className="mt-2 text-[13px] text-[var(--muted)]">{l}</div>
          </div>
        ))}
      </Tile>
    </section>
  );
}

function SectionHead({ id, title, aside }: { id: string; title: string; aside: string }) {
  return (
    <Reveal className="mb-6 mt-24 flex items-end justify-between px-1 md:mt-32">
      <h2 id={id} className="scroll-mt-28 text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-none tracking-[-0.045em]">
        {title}
      </h2>
      <Label className="pb-2 text-[var(--muted)]">{aside}</Label>
    </Reveal>
  );
}

function Work({ onOpen }: { onOpen: (p: ConceptProject) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        {WORK_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <button
              onClick={() => onOpen(p)}
              className="group flex h-full w-full flex-col rounded-[24px] bg-[var(--tile)] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-[var(--line)] transition duration-300 hover:ring-[color:var(--accentRing)] md:p-8"
            >
              <div className="flex items-center justify-between">
                <Label className="text-[var(--accent)]">
                  {p.kind} · {p.context}
                </Label>
                <ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
              </div>
              <h3 className="mt-4 text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em]">{p.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
              <div className="mt-6 rounded-[16px] bg-[var(--bg)] p-3 ring-1 ring-[var(--line)]">
                <Diagram p={p} />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {p.highlights.map((h) => (
                  <div key={h.label}>
                    <div className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em]">{h.value}</div>
                    <div className="mt-1.5 text-[12px] leading-snug text-[var(--muted)]">{h.label}</div>
                  </div>
                ))}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {OTHER_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.06}>
            <button
              onClick={() => onOpen(p)}
              className="group grid h-full w-full grid-cols-[7.5rem_1fr] items-center gap-5 rounded-[24px] bg-[var(--tile)] p-4 text-left ring-1 ring-[var(--line)] transition hover:ring-[var(--line2)] sm:grid-cols-[10rem_1fr]"
            >
              <div className="overflow-hidden rounded-[14px] ring-1 ring-[var(--line)]">
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="min-w-0">
                <Label className="text-[var(--faint)]">
                  {p.kind} · {p.year}
                </Label>
                <h3 className="mt-1.5 flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                  {p.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Path() {
  return (
    <div className="rounded-[28px] bg-[var(--tile)] px-4 py-10 ring-1 ring-[var(--line)] md:px-10 md:py-14">
      <ol className="relative mx-auto max-w-5xl">
        <span className="absolute bottom-0 left-5 top-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[rgba(255,255,255,0.12)] to-transparent md:left-1/2" />
        {TIMELINE.map((r, i) => {
          const left = i % 2 === 0;
          const isEdu = r.kind === "education";
          return (
            <li key={r.id} className="relative grid grid-cols-1 pb-6 pl-12 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
              <span className="absolute left-5 top-8 grid -translate-x-1/2 place-items-center md:left-1/2">
                {r.current && <span className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--accent)] opacity-50" />}
                <span
                  className={`relative h-4 w-4 rounded-full border-[3px] border-[var(--tile)] ${
                    r.current ? "bg-[var(--accent)]" : isEdu ? "bg-[var(--faint)]" : "bg-[var(--text)]"
                  }`}
                />
              </span>

              <Reveal className={left ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"} y={24}>
                <article className="rounded-[20px] bg-[var(--tile2)] p-6 ring-1 ring-[var(--line)]">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[11px] font-semibold ${
                        r.current ? "bg-[var(--accent)] text-[var(--onAccent)]" : "bg-white/10 text-[var(--text)]"
                      }`}
                    >
                      {isEdu ? <GraduationCap className="h-4 w-4" /> : r.org.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium">{r.org}</p>
                      <p className="truncate text-[13px] text-[var(--muted)]">{r.location}</p>
                    </div>
                  </div>
                  <p style={mono} className="mt-5 text-[12px] text-[var(--muted)] md:hidden">
                    {r.period}
                  </p>
                  <h3 className="mt-2 text-[1.45rem] font-semibold leading-tight tracking-[-0.03em] md:mt-5">{r.role}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{r.summary}</p>
                  {r.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {r.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-[var(--soft)]">
                          <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {r.stack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {r.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>

              <div
                className={`hidden pt-5 md:row-start-1 md:flex md:flex-col ${
                  left ? "md:col-start-2 md:items-start" : "md:col-start-1 md:items-end md:text-right"
                }`}
              >
                <Reveal>
                  <span className="block text-[5rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.07]">{r.year}</span>
                  <Label className="mt-2 block text-[var(--muted)]">{r.period}</Label>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProjectSheet({ p, onClose }: { p: ConceptProject | null; onClose: () => void }) {
  useModal(!!p, onClose);
  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label={p.title}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[var(--tile)] p-6 ring-1 ring-[var(--line2)] md:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--tile2)] text-[var(--muted)] hover:text-[var(--text)]"
            >
              <X className="h-4 w-4" />
            </button>
            <Label className="text-[var(--accent)]">
              {p.kind} · {p.context} · {p.year}
            </Label>
            <h2 className="mt-3 pr-12 text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.04em]">{p.title}</h2>
            <p className="mt-3 text-[16px] text-[var(--muted)]">{p.summary}</p>

            <div className="mt-8 overflow-hidden rounded-[18px] bg-[var(--bg)] p-3 ring-1 ring-[var(--line)]">
              {isWorkProject(p) ? <Diagram p={p} /> : p.image && <img src={p.image} alt={p.title} className="w-full rounded-lg" />}
            </div>
            {p.note && (
              <p style={mono} className="mt-2 text-[11px] text-[var(--faint)]">
                {p.note}
              </p>
            )}

            {isWorkProject(p) && (
              <div className="mt-8 rounded-[18px] bg-[var(--tile2)] p-5 ring-1 ring-[var(--line)]">
                <Label className="text-[var(--accent)]">What I did</Label>
                <ul className="mt-3 space-y-2">
                  {p.contributions.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {(
                [
                  ["Problem", p.problem],
                  ["Approach", p.approach],
                  ["Outcome", p.outcome],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <Label className="text-[var(--muted)]">{k}</Label>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--soft2)]">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
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
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--text)] px-4 py-2 text-[14px] font-medium text-[var(--bg)] hover:bg-[var(--accent)]"
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

export default function BentoNight() {
  return <NightLayout theme={NIGHT} />;
}

function NightLayout({ theme: t }: { theme: NightTheme }) {
  useConceptPage({ title: `John Gibson — ${t.title}`, fonts: FONTS, background: t.bg });
  const [selected, setSelected] = useState<ConceptProject | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const { copied, copy } = useCopyEmail();

  const vars = {
    "--bg": t.bg,
    "--tile": t.tile,
    "--tile2": t.tile2,
    "--line": t.line,
    "--line2": t.line2,
    "--text": t.text,
    "--muted": t.muted,
    "--faint": t.faint,
    "--soft": t.soft,
    "--soft2": t.soft2,
    "--accent": t.accent,
    "--onAccent": t.onAccent,
    "--accentRing": t.accentRing,
    "--glow": t.glow,
    "--header": t.header,
    "--contactBtnText": t.contactBtnText,
    "--onAccentLine": t.onAccentLine,
    "--onAccentHover": t.onAccentHover,
    backgroundColor: t.bg,
    color: t.text,
    fontFamily: "'Instrument Sans', sans-serif",
  } as CSSProperties;

  return (
    <ThemeCtx.Provider value={t}>
    <MotionConfig reducedMotion="user">
      <div style={vars} className="min-h-screen selection:bg-[var(--accent)] selection:text-[var(--onAccent)]">
        <header className="sticky top-3 z-40 px-3">
          <div
            className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full py-2 pl-2 pr-2 ring-1 ring-[var(--line2)] backdrop-blur-md"
            style={{ backgroundColor: "var(--header)" }}
          >
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[12px] font-bold text-[var(--onAccent)]">JG</span>
              <span className="text-[16px] font-semibold tracking-[-0.02em]">John Gibson</span>
            </a>
            <nav className="flex items-center gap-1 text-[15px]">
              {[
                ["#work", "Work"],
                ["#path", "Path"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="hidden rounded-full px-3.5 py-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--text)] sm:inline">
                  {label}
                </a>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--text)] px-4 py-2 font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
              >
                <FileText className="h-4 w-4" /> Résumé
              </a>
            </nav>
          </div>
        </header>

        <main id="top" className="mx-auto max-w-[1240px] px-3 pb-10 pt-6">
          <Hero />

          <SectionHead id="work" title="Selected work" aside={`${PROJECTS_V2.length} projects`} />
          <Work onOpen={setSelected} />

          <SectionHead id="path" title="The path so far" aside="2023 — now" />
          <Path />

          <Reveal className="mt-24 md:mt-32">
            <section id="contact" className="relative scroll-mt-28 overflow-hidden rounded-[32px] bg-[var(--accent)] p-8 text-[var(--onAccent)] md:p-14">
              <Label className="text-[var(--onAccent)] opacity-60">Contact</Label>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                Building an AI platform? I&apos;d love to hear about it.
              </h2>
              <div className="mt-10 flex flex-wrap gap-2.5">
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--onAccent)] px-5 py-3 text-[16px] font-medium text-[var(--contactBtnText)] transition hover:opacity-90"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : PROFILE.email}
                </button>
                {[
                  ["LinkedIn", PROFILE.linkedin],
                  ["GitHub", PROFILE.github],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[16px] font-medium ring-1 ring-[color:var(--onAccentLine)] transition hover:bg-[color:var(--onAccentHover)]"
                  >
                    {label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          </Reveal>

          <footer style={mono} className="flex flex-col gap-1 px-2 pb-20 pt-8 text-[11px] text-[var(--faint)] md:flex-row md:justify-between">
            <span>© {new Date().getFullYear()} John Gibson</span>
            <span>{PROFILE.offClock}</span>
          </footer>
        </main>

        <ProjectSheet p={selected} onClose={close} />
        <ConceptSwitcher />
      </div>
    </MotionConfig>
    </ThemeCtx.Provider>
  );
}
