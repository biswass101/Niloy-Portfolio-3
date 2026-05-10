import Link from "next/link";
import { ArrowLeft, Award, ExternalLink, Trophy } from "lucide-react";
import UniverseBackground from "@/components/UniverseBackground";
import { certifications } from "@/data/certifications";

const CertificationsPage = () => {
  return (
    <main className="relative min-h-screen bg-background section-padding">
      <UniverseBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-xs font-mono text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <section className="mt-8 rounded-2xl glass p-6 md:p-8">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-primary">Career Milestones</p>
          <h1 className="font-mono text-3xl font-bold md:text-4xl">Awards & Certifications</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A detailed view of achievements, course completions, and competitive milestones that reflect my learning path and professional growth.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-background/80 p-6 transition-all duration-300 hover:border-primary/35 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-primary">
                  {item.type === "award" ? <Trophy size={12} /> : <Award size={12} />}
                  {item.type}
                </span>
                <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                  {item.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>

              <h2 className="font-mono text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-primary">{item.issuer}</p>
              <p className="mt-1 text-xs font-mono text-muted-foreground">{item.period}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.details}</p>

              {item.credentialUrl ? (
                <Link
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
                >
                  View credential
                  <ExternalLink size={13} />
                </Link>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default CertificationsPage;
