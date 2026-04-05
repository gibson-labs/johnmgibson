import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/portfolioData';
import { Project } from '@/types/project';
import ProjectModal from '@/components/portfolio/ProjectModal';

const featured = PROJECTS.slice(0, 3);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-4">
            <h2 className="section-heading">Featured Projects</h2>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A selection of my recent work.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group animate-fade-in-up opacity-0 text-left bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-4xl font-bold text-muted-foreground/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary tracking-wide uppercase">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-lg font-semibold mt-1 group-hover:text-primary transition-colors flex items-center gap-1">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default Projects;
