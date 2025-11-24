import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="text-sm font-medium text-primary">Let's Connect</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> Touch</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full mb-4 mx-auto" />
            <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  Availability
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm currently open to freelance opportunities and am looking for full-time positions starting in December.
                  If you have a project that could use my help, please don't hesitate to reach out.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-background/50 backdrop-blur border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href="tel:6606051216" className="text-lg font-semibold hover:text-primary transition-colors">
                        (660) 605-1216
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background/50 backdrop-blur border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:johnmgibson3@gmail.com" className="text-lg font-semibold hover:text-primary transition-colors">
                        johnmgibson3@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="p-8 rounded-2xl bg-background/50 backdrop-blur border border-primary/10 h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                    Connect With Me
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </h3>

                <p className="text-muted-foreground mb-8">
                  Let's connect on social media and stay in touch!
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="https://github.com/johnmgibson3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 flex items-center gap-4"
                  >
                    <div className="p-3 rounded-full bg-background/50">
                      <Github size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 group-hover:text-primary transition-colors">GitHub</p>
                      <p className="text-sm text-muted-foreground">@johnmgibson3</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/john-gibson-iii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 flex items-center gap-4"
                  >
                    <div className="p-3 rounded-full bg-background/50">
                      <Linkedin size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 group-hover:text-primary transition-colors">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">john-gibson-iii</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="glass p-6">
            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  required
                  className="min-h-[150px] bg-secondary/50"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact; 
