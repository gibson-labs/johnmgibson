import { CATEGORIES, TECHNOLOGIES } from "@/lib/portfolioData";

interface Filters {
  categories: string[];
  technologies: string[];
}

interface FilterBarProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() =>
                  setFilters({ ...filters, categories: toggle(filters.categories, cat) })
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
          Tech
        </p>
        <div className="flex flex-wrap gap-2">
          {TECHNOLOGIES.map((tech) => {
            const active = filters.technologies.includes(tech);
            return (
              <button
                key={tech}
                onClick={() =>
                  setFilters({ ...filters, technologies: toggle(filters.technologies, tech) })
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  active
                    ? "bg-primary/20 text-primary border-primary/40"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {(filters.categories.length > 0 || filters.technologies.length > 0) && (
        <button
          onClick={() => setFilters({ categories: [], technologies: [] })}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
