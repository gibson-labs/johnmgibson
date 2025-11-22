import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption1 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20">
          {/* Profile image - moved to left for more professional feel */}
          <div className="flex-shrink-0 w-56 h-56 md:w-72 md:h-72 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <img
              src={portraitImage}
              alt="John Gibson"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            {/* Subtle badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Available for opportunities</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              John Gibson
            </h1>

            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              Software Engineer
            </h2>

            <p className="text-base md:text-lg text-muted-foreground/80 mb-3 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              Information Systems Student at BYU's Marriott School of Business
            </p>

            <p className="text-base text-muted-foreground/70 mb-8 max-w-xl leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
              Specializing in building secure, scalable, and efficient full-stack applications with modern technologies.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1.6s' }}>
              <Button size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#projects"
          className="animate-bounce-subtle text-primary/60 hover:text-primary transition-colors"
          aria-label="Scroll to projects"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroOption1;
