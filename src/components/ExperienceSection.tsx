import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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

const ExperienceSection = () => {
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
