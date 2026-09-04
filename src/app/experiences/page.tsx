import { Briefcase } from "lucide-react";
import UniverseBackground from "@/components/UniverseBackground";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "Oct 2025 - May 2026",
    highlights: [
      "Developed backend services for a social media automation platform integrating OpenAI with Meta Platforms (Facebook & Instagram), enabling automated customer messaging, order handling, and post comment replies.",
      "Implemented image and voice message processing, integrated Meta Webhooks, and optimized API request pipelines, reducing OpenAI token usage by 30% while improving response latency through Redis caching and rate limiting.",
      "Contributed to v2 development by implementing asynchronous job processing with BullMQ, improving system reliability and throughput while supporting deployment, staging, and debugging using Docker, PM2, and CI/CD.",
      "Built, deployed, and maintained production and staging applications on AWS and Google Cloud Platform, leveraging EC2, RDS, S3, IAM, VPC, and Compute Engine to deliver secure and scalable cloud infrastructure.",
      "Integrated Amazon Bedrock into production applications and worked with Kubernetes (Minikube), Terraform, and Ansible for container orchestration, infrastructure provisioning, and configuration management.",
      "Administered Linux servers and monitored application performance using Prometheus and Grafana, performing troubleshooting, performance optimization, and production maintenance.",
    ],
    tech: ["Node.js", "OpenAI", "Redis", "BullMQ", "Docker", "AWS", "GCP", "Kubernetes", "Terraform", "Ansible"],
  },
  {
    title: "Junior Software Developer Intern",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "April 2025 - Oct 2025",
    highlights: [
      "Rebuilt and deployed a full-stack Education Management System using Next.js (SSR, CSR, SSG), Node.js, Express.js, NestJS, MongoDB, and PostgreSQL, resolving codebase and deployment issues.",
      "Developed backend APIs and application features while collaborating on frontend implementation, gaining hands-on experience across the full-stack development lifecycle.",
      "Built responsive and interactive user interfaces for a travel agency platform using Nuxt.js (Vue.js), improving performance, user experience, and SEO.",
      "Developed an MVP social media automation platform integrating OpenAI with Facebook Page APIs, implementing customer messaging and comment reply automation while gaining practical experience in AI integration and full-stack application development.",
    ],
    tech: ["Next.js", "Nuxt.js", "Node.js", "Express.js", "NestJS", "MongoDB", "PostgreSQL", "OpenAI"],
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
