import { motion } from "framer-motion";
import Link from "next/link";
import {
  BrainCircuit,
  Braces,
  Code2,
  Container,
  Database,
  FileCode2,
  FlaskConical,
  GitBranch,
  Globe,
  Layers3,
  MonitorCog,
  Network,
  Server,
  Settings,
  Terminal,
  Workflow,
  Wrench,
  type LucideIcon,
  GitGraph,
  LucideGitBranch,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Redux", "Nuxt.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "CI/CD", "Linux", "AWS", "Kubernetes", "PM2", "Redis", "Git"],
  },
];

const skillIcons: Record<string, LucideIcon> = {
  "C/C++": Braces,
  Python: FileCode2,
  JavaScript: Code2,
  TypeScript: Code2,
  SQL: Database,
  "React.js": Layers3,
  "Next.js": Globe,
  "Redux": LucideGitBranch,
  "Nuxt.js": Globe,
  "Vue.js": Layers3,
  "Tailwind CSS": Wrench,
  "Node.js": Server,
  "Express.js": Network,
  NestJS: Server,
  "REST APIs": Workflow,
  "GraphQL" : GitGraph,
  MongoDB: Database,
  PostgreSQL: Database,
  Docker: Container,
  "CI/CD": Workflow,
  Linux: Terminal,
  AWS: MonitorCog,
  Kubernetes: Settings,
  PM2: FlaskConical,
  Redis: Database,
  Git: GitBranch,
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">
            Core Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Skills</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="glass rounded-lg p-6"
              >
                <h3 className="font-mono text-primary text-sm uppercase tracking-widest mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-mono text-primary cursor-default transition-colors duration-200 hover:border-primary/40 hover:bg-primary/15"
                    >
                      {(() => {
                        const Icon = skillIcons[skill] ?? Code2;
                        return <Icon size={14} className="shrink-0" />;
                      })()}
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/technical-expertise"
                  className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-card/80 text-primary shadow-[0_0_24px_hsl(var(--primary)/0.22)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary/15"
                  aria-label="Detailed Technical Expertise"
                >
                  <BrainCircuit size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-mono text-xs">
                Detailed Technical Expertise
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/technical-expertise"
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-card/80 text-primary shadow-[0_0_24px_hsl(var(--primary)/0.22)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary/15"
                  aria-label="Detailed Technical Expertise"
                >
                  <BrainCircuit size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-mono text-xs">
                Detailed Technical Expertise
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
