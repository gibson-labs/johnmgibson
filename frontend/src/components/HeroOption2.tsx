import { Button } from '@/components/ui/button';
import { ArrowDown, Terminal, Code2, Database } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption2 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {/* Floating accent elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Small tech icons */}
          <div className="flex gap-4 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Terminal size={20} className="text-primary" />
            </div>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Code2 size={20} className="text-primary" />
            </div>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Database size={20} className="text-primary" />
            </div>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
              John Gibson
            </span>
          </h1>

          <div className="flex items-center gap-4 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <h2 className="text-xl md:text-2xl text-primary font-semibold tracking-wide">
              FULL-STACK SOFTWARE ENGINEER
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
            Information Systems Student at BYU's Marriott School of Business
          </p>

          <p className="text-base text-muted-foreground/70 mb-8 max-w-2xl leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
            Building modern web applications with React, TypeScript, and Python.
            Focused on creating secure, scalable solutions that solve real-world problems.
          </p>

          {/* Profile image - centered below text */}
          <div className="w-40 h-40 mb-10 animate-fade-in opacity-0 relative" style={{ animationDelay: '1.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-xl opacity-30" />
            <img
              src={portraitImage}
              alt="John Gibson"
              className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10 shadow-2xl"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
            <Button size="lg" className="px-8" asChild>
              <a href="#projects">Explore My Work</a>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="#contact">Let's Connect</a>
            </Button>
          </div>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-12 animate-fade-in opacity-0" style={{ animationDelay: '1.6s' }}>
            {['React', 'TypeScript', 'Python', 'Flask', 'Tailwind', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-primary/5 border border-primary/10 rounded text-muted-foreground hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
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

export default HeroOption2;
