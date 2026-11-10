import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useConceptPage } from "./shared/useConceptPage";

const FONTS = [
  "family=Bricolage+Grotesque:opsz,wght@12..96,300..800",
  "family=Instrument+Sans:wdth,wght@75..100,400..700",
  "family=Geist:wght@300..700",
].join("&");

interface Concept {
  to: string;
  letter: string;
  name: string;
  tag?: string;
  vibe: string;
  body: string;
  bg: string;
  fg: string;
  swatches: string[];
  sample: CSSProperties;
}

const CONCEPTS: Concept[] = [
  {
    to: "/concepts/bento",
    letter: "C",
    name: "Bento",
    tag: "Favorite · day",
    vibe: "Modern · friendly · product-minded",
    body: "Warm-gray canvas, soft tiles, one cobalt accent. Live local time, a Now tile, and the alternating timeline rebuilt so neither side sits empty.",
    bg: "#E9E7E2",
    fg: "#111112",
    swatches: ["#E9E7E2", "#111112", "#2337FF"],
    sample: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, letterSpacing: "-0.045em" },
  },
  {
    to: "/concepts/bento-night",
    letter: "D",
    name: "Bento Night",
    tag: "Favorite · night",
    vibe: "Dark · polished · confident",
    body: "Bento's layout in a graphite control room. Coral signal color, the homelab status tile, and both work platforms as big diagram tiles.",
    bg: "#0B0B0C",
    fg: "#F2F1EE",
    swatches: ["#0B0B0C", "#F2F1EE", "#FF5B3A"],
    sample: { fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, letterSpacing: "-0.05em" },
  },
  {
    to: "/concepts/trace",
    letter: "F",
    name: "Trace",
    tag: "Idea bank",
    vibe: "Observability console · on-brand",
    body: "Your site as a tracing UI. Span attributes instead of a bio, career as a trace waterfall with the current role still recording, projects as services.",
    bg: "#0A0D13",
    fg: "#E6EAF2",
    swatches: ["#0A0D13", "#2DD4BF", "#60A5FA", "#FBBF24"],
    sample: { fontFamily: "'Geist', sans-serif", fontWeight: 600, letterSpacing: "-0.045em" },
  },
];

export default function ConceptsIndex() {
  useConceptPage({ title: "johnmgibson.com — design concepts", fonts: FONTS, background: "#FAFAF8" });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-neutral-500">johnmgibson.com · redesign · shortlist</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">The shortlist</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-neutral-600">
          Bento and Night are the day and night sides of the direction. Trace stays as an idea bank for details worth borrowing.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CONCEPTS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-44 items-end p-6" style={{ backgroundColor: c.bg, color: c.fg }}>
                <span className="absolute left-6 top-5 text-[13px] font-medium opacity-60">Concept {c.letter}</span>
                {c.tag && (
                  <span className="absolute right-5 top-4 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur" style={{ color: c.fg }}>
                    {c.tag}
                  </span>
                )}
                <span className="text-[2.4rem] leading-[0.95]" style={c.sample}>
                  John Gibson
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{c.name}</h2>
                  <ArrowUpRight className="h-5 w-5 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                </div>
                <p className="mt-1 text-[13px] text-neutral-500">{c.vibe}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-600">{c.body}</p>
                <div className="mt-6 flex gap-1.5">
                  {c.swatches.map((s) => (
                    <span key={s} className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ backgroundColor: s }} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-[14px] text-neutral-500">
          Or compare against the{" "}
          <Link to="/" className="font-medium text-neutral-900 underline underline-offset-4">
            current site
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
