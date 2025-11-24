
const Footer = () => {
  return (
    <footer className="relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  John Gibson
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <p className="text-muted-foreground/70 text-sm">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="text-muted-foreground/70 text-sm text-center md:text-right">
                Designed & Built with{' '}
                <span className="text-primary font-medium">React</span>,{' '}
                <span className="text-primary font-medium">TypeScript</span> &{' '}
                <span className="text-primary font-medium">Tailwind CSS</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground/60">
                  Deployed & Live
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
