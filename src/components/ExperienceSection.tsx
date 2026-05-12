import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { PortfolioExperience } from "@/types/cms";

type ExperienceSectionProps = {
  experiences: PortfolioExperience[];
};

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  if (experiences.length === 0) return null;

  const sameCompanyAndLocation = experiences.every(
    (exp) =>
      exp.company === experiences[0].company &&
      exp.location === experiences[0].location
  );

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">
            Career Timeline
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Experience</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="relative">
          {sameCompanyAndLocation && (
            <div className="mb-8 rounded-lg border border-border/60 bg-card/30 px-4 py-3 font-mono text-xs text-primary">
              {experiences[0].company} · {experiences[0].location}
            </div>
          )}

          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
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

              <div className="glass rounded-lg border-l-2 border-primary/40 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    {!sameCompanyAndLocation && (
                      <p className="text-primary text-sm font-mono">
                        {exp.company} · {exp.location}
                      </p>
                    )}
                  </div>
                  <span className="text-muted-foreground text-xs font-mono mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-4 flex-shrink-0 items-center justify-center text-primary leading-none">
                        ▹
                      </span>
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
