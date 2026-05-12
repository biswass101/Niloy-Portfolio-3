import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight, Award, Trophy } from "lucide-react";
import type { PortfolioCertification, PortfolioEducationContent } from "@/types/cms";

type EducationSectionProps = {
  education: PortfolioEducationContent;
  certifications: PortfolioCertification[];
};

const EducationSection = ({ education, certifications }: EducationSectionProps) => {
  const awards = certifications.slice(0, 4);

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">
            Academic Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Education & Awards</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <motion.article
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative md:pr-10"
            >
              <div className="absolute right-0 top-8 hidden h-5 w-5 translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:flex">
                <GraduationCap size={10} className="text-primary" />
              </div>

              <div className="group relative overflow-hidden rounded-lg glass p-6">
                <Image
                  src={education.backgroundImageUrl || "/placeholder.svg"}
                  alt="City University campus"
                  fill
                  className="object-cover opacity-40 transition-all duration-500 group-hover:opacity-55 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 blur-[2px] transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-br from-background/75 via-background/55 to-background/70" />

                <div className="relative z-10">
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {education.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">{education.period}</span>
                  </div>
                  <p className="mb-4 text-sm font-mono text-primary">{education.organization}</p>

                  <ul className="space-y-2">
                    {education.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-4 flex-shrink-0 items-center justify-center text-primary leading-none">
                          ▹
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-full md:pl-10"
            >
              <div className="absolute left-0 top-8 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:flex">
                <Award size={10} className="text-primary" />
              </div>

              <div className="group relative h-full overflow-hidden rounded-lg glass p-6">
                <div className="relative z-10 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0 group-hover:blur-sm">
                  <h3 className="mb-4 font-mono text-lg font-semibold text-foreground">
                    Awards & Certifications
                  </h3>
                  <ul className="space-y-3">
                    {awards.map((award) => (
                      <li
                        key={award.id}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-0.5 text-primary">
                          {award.type === "award" ? <Trophy size={14} /> : <Award size={14} />}
                        </span>
                        {award.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pointer-events-none absolute inset-0 z-20 translate-y-full bg-gradient-to-t from-background/88 via-background/72 to-background/45 backdrop-blur-lg transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
                  <Link
                    href="/certifications"
                    className="inline-flex translate-y-6 items-center gap-2 rounded-lg border border-primary/40 bg-primary/12 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary/20"
                  >
                    See all Certifications
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
