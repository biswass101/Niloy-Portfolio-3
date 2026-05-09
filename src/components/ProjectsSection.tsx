import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";

const featuredProjects = projects.slice(0, 3);

const ProjectsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Projects</h2>
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
              className="glass rounded-lg p-6 flex flex-col h-full group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
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

              <h3 className="font-mono text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-muted-foreground">
                    {t}
                    {project.tech.indexOf(t) < project.tech.length - 1 && " ·"}
                  </span>
                ))}
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
            className="inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary/20"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
