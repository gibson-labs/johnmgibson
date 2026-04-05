import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none animate-fade-in opacity-0 text-foreground" style={{ animationDelay: '0.4s' }}>
              John Gibson
            </h1>

            <div className="flex items-center gap-3 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-xl md:text-2xl text-primary font-semibold tracking-wide">
                AI ENGINEER
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-3 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              Software Engineer focused on AI platforms, automation, and cloud-based systems.
            </p>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              I translate business and operational needs into production software — from modernizing legacy systems and internal tooling to AI platform infrastructure with CI/CD, observability, and LLM integrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <a href="#projects">View My Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
              {['Python', 'TypeScript', 'AWS', 'Docker', 'React', 'GitHub Actions'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-secondary border border-border rounded text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Portrait */}
          <div
            className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in opacity-0 mt-16 md:mt-0"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <img
                src={portraitImage}
                alt="John Gibson"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to projects"
        >
          <ArrowDown size={28} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
