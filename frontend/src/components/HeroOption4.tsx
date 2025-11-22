import { Button } from '@/components/ui/button';
import { ArrowDown, Terminal, Code2, Database, Sparkles } from 'lucide-react';
import portraitImage from '@/assets/images/portrait.jpeg';

const HeroOption4 = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background from Option 2 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Left content - Bold style from Option 3 */}
          <div className="order-2 md:order-1">
            {/* Tech icons from Option 2 */}
            <div className="flex gap-3 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Terminal size={20} className="text-primary" />
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Code2 size={20} className="text-primary" />
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Database size={20} className="text-primary" />
              </div>
            </div>

            {/* Gradient name from Option 2, layout from Option 3 */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                John Gibson
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <Sparkles size={20} className="text-primary" />
              <h2 className="text-xl md:text-2xl text-primary font-semibold tracking-wide">
                SOFTWARE ENGINEER
              </h2>
            </div>

            <p className="text-lg text-muted-foreground/80 mb-3 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              Information Systems Student at BYU's Marriott School of Business
            </p>

            <p className="text-base text-muted-foreground/70 mb-8 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              Building modern web applications with React, TypeScript, and Python.
              Focused on creating secure, scalable solutions that solve real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <a href="#projects">View My Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Tech stack from Option 2 */}
            <div className="flex flex-wrap gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
              {['React', 'TypeScript', 'Python', 'Flask', 'Tailwind', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-primary/5 border border-primary/10 rounded text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Large image from Option 3 */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl rounded-full scale-110" />
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <img
                  src={portraitImage}
                  alt="John Gibson"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border border-primary/20"
                />
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

export default HeroOption4;
