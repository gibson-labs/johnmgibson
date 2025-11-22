import { Button } from '@/components/ui/button';
import { ArrowDown, Rocket, TrendingUp } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption10 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Energetic gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="order-2 md:order-1">
            {/* Energetic badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <Rocket size={18} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Building the Future</span>
              <TrendingUp size={14} className="text-primary" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.95] animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              <span className="block">John</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Gibson
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              Full-Stack Software Engineer
            </h2>

            <p className="text-base text-muted-foreground/90 mb-4 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              Information Systems Student at <span className="text-foreground font-medium">BYU's Marriott School of Business</span>
            </p>

            <p className="text-base text-muted-foreground/80 mb-10 max-w-lg leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              Passionate about creating exceptional digital experiences.
              Transforming ideas into powerful, user-centric applications.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
              <Button size="lg" className="px-8 shadow-lg shadow-primary/20" asChild>
                <a href="#projects">See My Work</a>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <a href="#contact">Let's Talk</a>
              </Button>
            </div>

            {/* Stats with energy */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-1">3+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-1">10+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-1">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Dedicated</div>
              </div>
            </div>
          </div>

          {/* Right - Dynamic image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              {/* Vibrant glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent rounded-3xl blur-2xl scale-105" />

              <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem]">
                <img
                  src={portraitImage}
                  alt="John Gibson"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-primary/20"
                />

                {/* Floating accent */}
                <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg shadow-primary/30">
                  <div className="text-sm font-bold text-white">Available Now</div>
                  <div className="text-xs text-white/80">For Projects</div>
                </div>
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

export default HeroOption10;
