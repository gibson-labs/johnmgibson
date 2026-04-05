import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/lib/portfolioData";
import { Project } from "@/types/project";
import FilterBar from "@/components/portfolio/FilterBar";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllProjects() {
  const [filters, setFilters] = useState<{ categories: string[]; technologies: string[] }>({
    categories: [],
    technologies: [],
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchParams] = useSearchParams();

  const filtered = useMemo(() => {
    const category = searchParams.get("category");
    let result = [...PROJECTS];

    const activeCategories = category ? [category] : filters.categories;

    if (activeCategories.length > 0) {
      result = result.filter((p) => activeCategories.includes(p.category));
    }
    if (filters.technologies.length > 0) {
      result = result.filter((p) =>
        filters.technologies.some((t) => p.technologies.includes(t))
      );
    }
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return result;
  }, [filters, searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything I've built — full-stack apps, AI tools, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10"
          >
            <FilterBar filters={filters} setFilters={setFilters} />
          </motion.div>

          <LayoutGroup>
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No projects match the selected filters.
              </p>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
