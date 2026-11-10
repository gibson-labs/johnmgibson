import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LayoutGrid, X } from "lucide-react";

export const CONCEPT_LINKS = [
  { to: "/concepts/bento", short: "C", label: "Bento" },
  { to: "/concepts/bento-night", short: "D", label: "Night" },
  { to: "/concepts/trace", short: "F", label: "Trace" },
];

/** Floating pill for flipping between concepts while comparing. Not part of any design. */
export default function ConceptSwitcher() {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 right-4 z-[100] grid h-10 w-10 place-items-center rounded-full bg-neutral-950/90 text-white shadow-xl ring-1 ring-white/10 backdrop-blur"
        aria-label="Show concept switcher"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    );
  }

  return (
    <nav
      className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-neutral-950/90 p-1.5 text-[12px] text-white/70 shadow-2xl ring-1 ring-white/10 backdrop-blur"
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      aria-label="Design concepts"
    >
      <Link to="/concepts" className="rounded-full px-3 py-1.5 hover:text-white">
        All
      </Link>
      {CONCEPT_LINKS.map((c) => (
        <NavLink
          key={c.to}
          to={c.to}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
              isActive ? "bg-white text-neutral-950" : "hover:text-white"
            }`
          }
        >
          {c.short}
          <span className="hidden sm:inline"> · {c.label}</span>
        </NavLink>
      ))}
      <Link to="/" className="whitespace-nowrap rounded-full px-3 py-1.5 hover:text-white">
        Current
      </Link>
      <button
        onClick={() => setHidden(true)}
        className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 hover:text-white"
        aria-label="Hide concept switcher"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
