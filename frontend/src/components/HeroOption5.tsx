import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption5 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Bold gradient background from Option 3 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Large image at top */}
          <div className="mb-10 animate-fade-in opacity-0 relative" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl rounded-full scale-110" />
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <img
                src={portraitImage}
                alt="John Gibson"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-primary/20"
              />
              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-4 border-primary rounded-3xl" />
            </div>
          </div>

          {/* Badge from Option 3 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium">Software Engineer</span>
          </div>

          {/* Bold name styling from Option 3 */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-none animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary/60">
              John Gibson
            </span>
          </h1>

          <div className="space-y-3 mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Crafting elegant solutions to complex problems
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mx-auto" />
            <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto">
              Information Systems Student at BYU's Marriott School of Business,
              specializing in full-stack development and cloud architecture.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
            <Button size="lg" className="px-8" asChild>
              <a href="#projects">View My Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          {/* Stats from Option 3 */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/10 w-full max-w-2xl animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
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

export default HeroOption5;
