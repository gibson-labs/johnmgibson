import { X, Github, Link as LinkIcon, Calendar, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-fade-in shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Project Image */}
          {project.image && (
            <div className="w-full h-64 md:h-96 bg-muted overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{project.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Team of {project.teamSize}</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Challenge */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Solution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Outcome */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Outcome
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🛠️</span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex gap-3 pt-6 border-t border-border">
                {project.githubUrl && (
                  <Button size="lg" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={20} className="mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="lg" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon size={20} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
