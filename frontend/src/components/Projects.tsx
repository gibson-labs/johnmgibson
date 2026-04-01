import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Project } from '@/types/project';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ProjectModal from '@/components/portfolio/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    api.getProjects(true).then(setProjects);
  }, []);

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
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
