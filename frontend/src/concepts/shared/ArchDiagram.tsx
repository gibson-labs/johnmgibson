import type { DiagramKey } from "../content";

interface DBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  highlight?: boolean;
  /** Dashed outline for supporting/automation pieces. */
  ghost?: boolean;
}

interface DSpec {
  aria: string;
  boxes: DBox[];
  /** Solid edges get an animated flow overlay; dashed edges are static. */
  edges: { d: string; dashed?: boolean }[];
  labels: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }[];
}

const SPECS: Record<DiagramKey, DSpec> = {
  gateway: {
    aria: "Simplified LLM gateway architecture: clients route through CloudFront and a load balancer to a LiteLLM proxy backed by Redis and Postgres, which routes to Bedrock, OpenAI, and Gemini. Each request emits an OpenTelemetry trace that flows through Firehose, S3, Lambda, and Glue into Athena.",
    boxes: [
      { x: 16, y: 40, w: 118, h: 36, label: "Claude Code" },
      { x: 16, y: 92, w: 118, h: 36, label: "Open WebUI" },
      { x: 16, y: 144, w: 118, h: 36, label: "Internal apps" },
      { x: 170, y: 88, w: 108, h: 44, label: "CloudFront", sub: "load balancer" },
      { x: 318, y: 80, w: 150, h: 60, label: "LiteLLM proxy", sub: "fallback chains", highlight: true },
      { x: 560, y: 40, w: 144, h: 36, label: "AWS Bedrock" },
      { x: 560, y: 92, w: 144, h: 36, label: "OpenAI" },
      { x: 560, y: 144, w: 144, h: 36, label: "Gemini" },
      { x: 318, y: 176, w: 70, h: 30, label: "Redis" },
      { x: 398, y: 176, w: 70, h: 30, label: "Postgres" },
      { x: 16, y: 262, w: 120, h: 36, label: "OpenTelemetry" },
      { x: 156, y: 262, w: 96, h: 36, label: "Firehose" },
      { x: 272, y: 262, w: 56, h: 36, label: "S3" },
      { x: 348, y: 262, w: 88, h: 36, label: "Lambda" },
      { x: 456, y: 262, w: 72, h: 36, label: "Glue" },
      { x: 548, y: 262, w: 156, h: 36, label: "Athena · SQL", highlight: true },
    ],
    edges: [
      { d: "M134 58 C152 58, 152 100, 170 100" },
      { d: "M134 110 L170 110" },
      { d: "M134 162 C152 162, 152 120, 170 120" },
      { d: "M278 110 L318 110" },
      { d: "M468 104 C514 104, 514 58, 560 58" },
      { d: "M468 110 L560 110" },
      { d: "M468 116 C514 116, 514 162, 560 162" },
      { d: "M353 140 L353 176", dashed: true },
      { d: "M433 140 L433 176", dashed: true },
      { d: "M318 132 C240 150, 76 200, 76 262" },
      { d: "M136 280 L156 280" },
      { d: "M252 280 L272 280" },
      { d: "M328 280 L348 280" },
      { d: "M436 280 L456 280" },
      { d: "M528 280 L548 280" },
    ],
    labels: [
      { x: 75, y: 202, text: "CLIENTS", anchor: "middle" },
      { x: 632, y: 202, text: "~40 MODELS · 3 PROVIDERS", anchor: "middle" },
      { x: 156, y: 250, text: "EVERY REQUEST → A TRACE → QUERYABLE IN SQL" },
    ],
  },
  chat: {
    aria: "Simplified AI chat platform architecture: users sign in with OIDC SSO and reach Open WebUI on ECS through CloudFront, WAF, and a load balancer. Open WebUI uses Postgres, Redis, S3 for files and vectors, Tika with OCR for documents, and calls the LLM gateway. Automation includes MCP servers, vector cleanup, and access sync.",
    boxes: [
      { x: 16, y: 30, w: 104, h: 34, label: "OIDC SSO", ghost: true },
      { x: 16, y: 92, w: 104, h: 36, label: "800+ users" },
      { x: 146, y: 92, w: 104, h: 36, label: "CloudFront" },
      { x: 270, y: 92, w: 104, h: 36, label: "WAF · ALB" },
      { x: 400, y: 78, w: 150, h: 64, label: "Open WebUI", sub: "ecs · 2–10 tasks", highlight: true },
      { x: 590, y: 92, w: 114, h: 36, label: "LLM gateway" },
      { x: 146, y: 196, w: 128, h: 34, label: "Tika + OCR" },
      { x: 300, y: 196, w: 92, h: 34, label: "Postgres" },
      { x: 404, y: 196, w: 80, h: 34, label: "Redis" },
      { x: 496, y: 196, w: 96, h: 34, label: "S3 files" },
      { x: 604, y: 196, w: 100, h: 34, label: "S3 vectors" },
      { x: 146, y: 268, w: 128, h: 34, label: "MCP servers", ghost: true },
      { x: 300, y: 268, w: 176, h: 34, label: "Vector cleanup", ghost: true },
      { x: 496, y: 268, w: 208, h: 34, label: "Access sync", ghost: true },
    ],
    edges: [
      { d: "M120 47 C300 47, 475 30, 475 78", dashed: true },
      { d: "M120 110 L146 110" },
      { d: "M250 110 L270 110" },
      { d: "M374 110 L400 110" },
      { d: "M550 110 L590 110" },
      { d: "M440 142 C440 170, 346 168, 346 196" },
      { d: "M462 142 C462 172, 444 170, 444 196" },
      { d: "M500 142 C500 172, 544 170, 544 196" },
      { d: "M528 142 C528 170, 654 168, 654 196" },
      { d: "M400 134 C330 160, 210 160, 210 196" },
    ],
    labels: [
      { x: 16, y: 217, text: "DATA + DOCS" },
      { x: 16, y: 289, text: "AUTOMATION" },
    ],
  },
};

interface Props {
  diagram: DiagramKey;
  node: string;
  line: string;
  text: string;
  muted: string;
  accent: string;
  font: string;
  radius?: number;
  className?: string;
}

/** Simplified, themeable architecture sketch for the two work platforms. */
export default function ArchDiagram({ diagram, node, line, text, muted, accent, font, radius = 4, className }: Props) {
  const spec = SPECS[diagram];
  return (
    <svg viewBox="0 0 720 316" className={className} style={{ fontFamily: font }} role="img" aria-label={spec.aria}>
      <style>{`
        .ad-flow { stroke-dasharray: 3 7; animation: ad-dash 1.4s linear infinite; }
        @keyframes ad-dash { to { stroke-dashoffset: -20; } }
        @media (prefers-reduced-motion: reduce) { .ad-flow { animation: none; } }
      `}</style>

      {spec.edges.map((e) => (
        <g key={e.d}>
          <path d={e.d} fill="none" stroke={e.dashed ? muted : line} strokeWidth={1.2} strokeDasharray={e.dashed ? "2 4" : undefined} />
          {!e.dashed && <path d={e.d} fill="none" stroke={accent} strokeWidth={1.5} className="ad-flow" />}
        </g>
      ))}

      {spec.boxes.map((b) => {
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        return (
          <g key={b.label}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={radius}
              fill={node}
              stroke={b.highlight ? accent : b.ghost ? muted : line}
              strokeWidth={b.highlight ? 1.5 : 1}
              strokeDasharray={b.ghost ? "3 3" : undefined}
            />
            <text
              x={cx}
              y={b.sub ? cy - 7 : cy}
              textAnchor="middle"
              dominantBaseline="central"
              fill={text}
              fontSize={12.5}
              fontWeight={500}
            >
              {b.label}
            </text>
            {b.sub && (
              <text x={cx} y={cy + 11} textAnchor="middle" dominantBaseline="central" fill={muted} fontSize={9.5} letterSpacing="0.06em">
                {b.sub.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}

      {spec.labels.map((l) => (
        <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor ?? "start"} fill={muted} fontSize={9.5} letterSpacing="0.08em">
          {l.text}
        </text>
      ))}
    </svg>
  );
}
