import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EXPERIENCES } from "@/lib/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-3">
            Career Path
          </p>
          <h2 className="section-heading">Experience</h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.id}
              className={`relative flex items-start mb-12 last:mb-0 animate-fade-in-up opacity-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-background" />

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  {exp.period}
                </span>
                <h3 className="font-semibold text-xl mt-1 text-foreground">{exp.role}</h3>
                <p className="text-primary font-medium text-sm">{exp.company}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {exp.description}
                </p>
                <Link
                  to="/projects"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-3 hover:gap-2.5 transition-all ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  View Projects <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
