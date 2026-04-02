import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Briefcase, Tag, ZoomIn, Github, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Project } from "@/types/project";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setLightboxImg(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImg) setLightboxImg(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxImg, onClose]);

  const formattedDate = project?.date
    ? format(new Date(project.date), "MMM yyyy")
    : "";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-3xl my-8"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero image */}
            {project.thumbnail && (
              <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {project.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                  <Tag className="w-3 h-3" />
                  {project.category}
                </span>
                {project.role && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
                    <Briefcase className="w-3 h-3" />
                    {project.role}
                    {project.teamSize ? ` · ${project.teamSize}-person team` : ""}
                  </span>
                )}
                {project.date && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                    {project.timeline ? ` · ${project.timeline}` : ""}
                  </span>
                )}
              </div>

              {/* Tech */}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-muted-foreground text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Goal */}
              {project.goal && (
                <div className="mb-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">The Goal</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{project.goal}</p>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Results</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{project.results}</p>
                </div>
              )}

              {/* Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex gap-3 mb-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="group relative rounded-xl overflow-hidden border border-border cursor-zoom-in"
                        onClick={() => setLightboxImg(img)}
                      >
                        <img
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-background/20 text-white hover:bg-background/40 transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImg}
              alt="Expanded view"
              className="relative max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
