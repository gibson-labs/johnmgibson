import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption6 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Combined background - gradient from 3 + subtle grid from 2 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium tracking-wide">FULL-STACK ENGINEER</span>
            </div>

            {/* Bold name from Option 3, gradient from Option 2 */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.95] animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              John
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/60">
                Gibson
              </span>
            </h1>

            <div className="space-y-3 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Building powerful web experiences
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>

            <p className="text-base text-muted-foreground/80 mb-8 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              Information Systems Student at BYU's Marriott School of Business.
              Specializing in React, TypeScript, Python, and cloud-native applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            {/* Combined: Stats from 3 + Tech badges from 2 */}
            <div className="space-y-6 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
              {/* Tech stack */}
              <div>
                <div className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2 font-semibold">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Python', 'Flask', 'Tailwind', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono bg-primary/10 border border-primary/20 rounded-md text-muted-foreground hover:bg-primary/15 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-8 pt-4 border-t border-primary/10">
                <div>
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground">Tech</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Bold image from Option 3 */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl rounded-full scale-110" />
              <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem]">
                <img
                  src={portraitImage}
                  alt="John Gibson"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border border-primary/20"
                />
                {/* Corner accent from Option 3 */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-primary rounded-3xl" />
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

export default HeroOption6;
