import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "Oct 2025 - Present",
    highlights: [
      "Built v1 of a social media chatbot integrating OpenAI with Meta platforms (Facebook, Instagram) for automated messaging and order handling.",
      "Implemented image/voice message processing and stabilized Meta Webhook integrations.",
      "Reduced OpenAI token usage by 30% through optimized prompt engineering; introduced Redis caching and rate limiting.",
      "Contributing to v2 with BullMQ message queuing, Docker, CI/CD, and PM2 for scalability.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "OpenAI", "Redis", "BullMQ", "Docker"],
  },
  {
    title: "Software Developer Intern",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "April 2025 - Oct 2025",
    highlights: [
      "Rebuilt an Education Management System with Next.js, fixing deployment and codebase issues.",
      "Built a travel agency portfolio using Nuxt.js with animations and improved SEO.",
      "Contributed to backend development with Node.js, Express.js, and MongoDB.",
      "Initiated an MVP social media automation system with OpenAI APIs.",
    ],
    tech: ["Next.js", "Nuxt.js", "Node.js", "MongoDB", "NestJS", "PostgreSQL"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Experience</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-12 md:pl-16 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <Briefcase size={10} className="text-primary" />
              </div>

              <div className="glass rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-primary text-sm font-mono">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs font-mono mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm leading-relaxed flex gap-2"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
