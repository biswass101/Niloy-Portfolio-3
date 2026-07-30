import { motion } from "framer-motion";
import Link from "next/link";
import { Expand } from "lucide-react";
import { ExternalLink, Github } from "lucide-react";
import ProjectImageSlider from "@/components/ProjectImageSlider";
import ProjectPreviewDialog from "@/components/ProjectPreviewDialog";
import type { PortfolioProject } from "@/types/cms";

type ProjectsSectionProps = {
  projects: PortfolioProject[];
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const featuredProjects = projects.filter((project) => project.featured !== false);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">
            Featured Projects
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-2">Projects</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-lg overflow-hidden flex flex-col h-full group hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-44 w-full overflow-hidden border-b border-border/40 bg-muted/20">
                <ProjectPreviewDialog project={project}>
                  <button
                    type="button"
                    aria-label={`Open fullscreen preview for ${project.title}`}
                    className="relative h-full w-full text-left"
                  >
                    <ProjectImageSlider images={project.images} className="group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-mono uppercase tracking-wide text-white">
                      <Expand size={12} />
                      Full View
                    </span>
                  </button>
                </ProjectPreviewDialog>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">{project.year}</span>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Live"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-mono text-sm sm:text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-primary/20 bg-primary/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-mono text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm text-primary transition-all duration-300 hover:bg-primary/20"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
