import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";

interface Props {
  project: Project;
  onClick: (p: Project) => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
        <div className="aspect-[3/2] overflow-hidden bg-muted">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
          </div>
          <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
              {project.category}
            </span>
            {project.role && (
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
                {project.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
