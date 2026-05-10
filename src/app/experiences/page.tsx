import { Briefcase } from "lucide-react";
import UniverseBackground from "@/components/UniverseBackground";

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

const ExperiencesPage = () => {
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
          <div className="mb-8 rounded-lg border border-border/60 bg-card/30 px-4 py-3 font-mono text-xs text-primary">
            ReturnHex · Uttara (Remote)
          </div>

          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp) => (
            <article key={`${exp.title}-${exp.period}`} className="relative pb-12 pl-12 md:pl-16 last:pb-0">
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
