import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption3 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Bold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium">Software Engineer</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              John
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Gibson
              </span>
            </h1>

            <div className="space-y-4 mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Automting complex tasks with AI
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
              <p className="text-base text-muted-foreground/80">
                Information Systems Student at BYU's Marriott School of Business,
                specializing in AI Solutions and full-stack development.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <a href="#projects">View My Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Stats or highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary/10 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>

          {/* Right - Large impactful image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl rounded-full scale-110" />

              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <img
                  src={portraitImage}
                  alt="John Gibson"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border border-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#projects"
          className="animate-bounce-subtle text-primary hover:text-primary/80 transition-colors"
          aria-label="Scroll to projects"
        >
          <ArrowDown size={28} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
};

export default HeroOption3;
