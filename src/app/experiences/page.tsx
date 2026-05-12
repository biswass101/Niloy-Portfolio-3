"use client";

import { Briefcase } from "lucide-react";
import UniverseBackground from "@/components/UniverseBackground";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const ExperiencesPage = () => {
  const { content } = usePortfolioContent();

  return (
    <main className="relative min-h-screen bg-background section-padding pt-32">
      <UniverseBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        <section className="mb-14">
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">Career Timeline</p>
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">Experiences</h1>
          <div className="w-20 h-0.5 bg-primary/50" />
        </section>

        <section className="relative">
          {content.experiences.length > 0 && (
            <div className="mb-8 rounded-lg border border-border/60 bg-card/30 px-4 py-3 font-mono text-xs text-primary">
              {content.experiences[0].company} · {content.experiences[0].location}
            </div>
          )}

          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          {content.experiences.map((exp) => (
            <article key={exp.id} className="relative pb-12 pl-12 md:pl-16 last:pb-0">
              <div className="absolute left-2 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:left-4">
                <Briefcase size={10} className="text-primary" />
              </div>

              <div className="glass rounded-lg border-l-2 border-primary/40 p-6">
                <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-mono text-lg font-semibold text-foreground">{exp.title}</h2>
                  </div>
                  <span className="mt-1 text-xs font-mono text-muted-foreground md:mt-0">{exp.period}</span>
                </div>

                <p className="mb-4 text-sm font-mono text-primary">
                  {exp.company} · {exp.location}
                </p>

                <ul className="mb-4 space-y-2">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 inline-flex h-5 w-4 flex-shrink-0 items-center justify-center text-primary leading-none">
                        ▹
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-mono text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ExperiencesPage;
