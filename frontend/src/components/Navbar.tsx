import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg shadow-primary/5 border-b border-primary/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <a href="#home" className="group flex items-center gap-2">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 group-hover:from-primary/80 group-hover:to-primary transition-all">
            John Gibson
          </span>
          <div className={`h-px w-8 bg-gradient-to-r from-primary to-transparent transition-all duration-300 ${isScrolled ? 'w-12' : 'w-8'}`} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-foreground/80 hover:text-foreground transition-colors font-medium group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Button
            className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            asChild
          >
            <a href="/Gibson_John_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-primary/10">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-primary/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="w-full shadow-lg shadow-primary/20" asChild>
              <a
                href="/Gibson_John_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 
