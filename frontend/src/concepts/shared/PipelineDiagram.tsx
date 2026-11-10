interface Palette {
  node: string;
  line: string;
  text: string;
  muted: string;
  accent: string;
  font: string;
  radius?: number;
  className?: string;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  highlight?: boolean;
}

const CLIENTS: Box[] = [
  { x: 20, y: 50, w: 130, h: 40, label: "Claude Code" },
  { x: 20, y: 110, w: 130, h: 40, label: "Open WebUI" },
  { x: 20, y: 170, w: 130, h: 40, label: "Internal apps" },
];
const GATEWAY: Box = { x: 250, y: 96, w: 190, h: 68, label: "LiteLLM gateway", sub: "fallback chains", highlight: true };
const MODELS: Box = { x: 550, y: 96, w: 150, h: 68, label: "20+ models", sub: "wildcard routed" };
const TELEMETRY: Box[] = [
  { x: 200, y: 262, w: 124, h: 40, label: "OpenTelemetry" },
  { x: 354, y: 262, w: 96, h: 40, label: "Lambda" },
  { x: 480, y: 262, w: 86, h: 40, label: "Glue" },
  { x: 596, y: 262, w: 104, h: 40, label: "Athena" },
];
const EDGES = [
  "M150 70 C200 70, 200 116, 250 116",
  "M150 130 L250 130",
  "M150 190 C200 190, 200 144, 250 144",
  "M440 130 L550 130",
  "M345 164 C345 214, 262 212, 262 262",
  "M324 282 L354 282",
  "M450 282 L480 282",
  "M566 282 L596 282",
];

/** Simplified sketch of the MasterControl AI gateway + telemetry pipeline, themed per concept. */
export default function PipelineDiagram({ node, line, text, muted, accent, font, radius = 4, className }: Palette) {
  const renderBox = (b: Box) => {
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
          stroke={b.highlight ? accent : line}
          strokeWidth={b.highlight ? 1.5 : 1}
        />
        <text
          x={cx}
          y={b.sub ? cy - 7 : cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill={text}
          fontSize={13}
          fontWeight={500}
        >
          {b.label}
        </text>
        {b.sub && (
          <text x={cx} y={cy + 11} textAnchor="middle" dominantBaseline="central" fill={muted} fontSize={10} letterSpacing="0.06em">
            {b.sub.toUpperCase()}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 720 320"
      className={className}
      style={{ fontFamily: font }}
      role="img"
      aria-label="Simplified architecture: Claude Code, Open WebUI, and internal apps route through a LiteLLM gateway to 20+ models; OpenTelemetry data flows through Lambda and Glue into Athena."
    >
      <style>{`
        .pd-flow { stroke-dasharray: 3 7; animation: pd-dash 1.4s linear infinite; }
        @keyframes pd-dash { to { stroke-dashoffset: -20; } }
        @media (prefers-reduced-motion: reduce) { .pd-flow { animation: none; } }
      `}</style>

      {/* MCP: Claude Code administers the platform directly */}
      <path d="M85 50 C85 18, 345 18, 345 96" fill="none" stroke={muted} strokeWidth={1} strokeDasharray="2 4" />
      <rect x={193} y={22} width={44} height={19} rx={radius === 0 ? 0 : 9.5} fill={node} stroke={line} />
      <text x={215} y={31.5} textAnchor="middle" dominantBaseline="central" fill={muted} fontSize={10} letterSpacing="0.08em">
        MCP
      </text>

      {EDGES.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke={line} strokeWidth={1.25} />
          <path d={d} fill="none" stroke={accent} strokeWidth={1.5} className="pd-flow" />
        </g>
      ))}

      <rect x={566} y={80} width={150} height={68} rx={radius} fill={node} stroke={line} opacity={0.5} />
      <rect x={558} y={88} width={150} height={68} rx={radius} fill={node} stroke={line} opacity={0.8} />
      {[...CLIENTS, GATEWAY, MODELS, ...TELEMETRY].map(renderBox)}

      <text x={85} y={232} textAnchor="middle" fill={muted} fontSize={10} letterSpacing="0.08em">
        USED BY 800+ EMPLOYEES
      </text>
      <text x={200} y={250} fill={muted} fontSize={10} letterSpacing="0.08em">
        TELEMETRY PIPELINE
      </text>
    </svg>
  );
}
