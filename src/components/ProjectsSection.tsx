import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Social Media Automation Platform",
    description:
      "Chatbot integrating OpenAI with Meta platforms for automated customer messaging, order handling, and comment replies.",
    tech: ["Node.js", "OpenAI", "Meta APIs", "MongoDB", "Redis"],
    live: "https://autopingai.com",
    year: "2025",
  },
  {
    title: "Education Management System",
    description:
      "Rebuilt frontend and backend using Next.js and Node.js, improving deployment stability and performance.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://onlinequranacademybd.com",
    year: "2025",
  },
  {
    title: "Travel Agency Portfolio (BdiGo)",
    description:
      "Frontend-focused travel agency portfolio with responsive layouts, animations, and interactive UI using Nuxt.js and Motion.js.",
    tech: ["Nuxt.js", "Vue.js", "Motion.js", "CSS"],
    live: "https://bdigo.com",
    year: "2025",
  },
  {
    title: "GigaBook – Social Media Platform",
    description:
      "Lightweight social platform enabling user follow systems, post creation, editing, and profile management.",
    tech: ["Next.js", "NeonDB", "Prisma", "shadcn/ui"],
    live: "https://giga-book.vercel.app",
    github: "https://github.com/biswass101/GigaBook-Social-media",
    year: "2025",
  },
  {
    title: "Portfolio Management Platform",
    description:
      "Portfolio management with profile and section management, JWT auth, and Cloudinary integration.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://manage-grabbi.vercel.app",
    year: "2025",
  },
];

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
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
            <span className="text-primary">04.</span> Projects
          </h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-lg p-6 flex flex-col h-full group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">
                  {project.year}
                </span>
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
                  <span
                    key={t}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {t}
                    {project.tech.indexOf(t) < project.tech.length - 1 && " ·"}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
