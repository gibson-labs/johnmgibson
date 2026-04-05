import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/home/Experience';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div>
        <Navbar />
        <Hero />

        <div className="container mx-auto px-4">
          <div className="h-px bg-border" />
        </div>

        <Projects />

        <div className="container mx-auto px-4">
          <div className="h-px bg-border" />
        </div>

        <Experience />

        <div className="container mx-auto px-4">
          <div className="h-px bg-border" />
        </div>

        <Skills />
        <Footer />
      </div>
    </div>
  );
};

export default Index; 
