import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy } from "lucide-react";

const educationTimeline = [
  {
    title: "B.Sc. in Computer Science and Engineering",
    organization: "City University, Dhaka",
    period: "July 2022 - Present",
    details: [
      "8th Semester · CGPA: 3.50/4.00",
      "Core focus: OOP, Databases, Data Structures, Algorithms, OS, Networks, ML",
    ],
  },
];

const awards = [
  "Participated at ICPC Asia Dhaka Regional Onsite Contest (2025)",
  "Winner, Intra-Department Code Clash Programming Contest (2025)",
  "Software Developer Intern Completion Certificate at ReturnHex",
  "Mastering DevOps Course - Ostad (In Progress)",
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">Education & Awards</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          {educationTimeline.map((edu, idx) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-12 md:pl-16 pb-12"
            >
              <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <GraduationCap size={10} className="text-primary" />
              </div>

              <div className="glass rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {edu.title}
                    </h3>
                    <p className="text-primary text-sm font-mono">{edu.organization}</p>
                  </div>
                  <span className="text-muted-foreground text-xs font-mono mt-1 md:mt-0">
                    {edu.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {edu.details.map((detail) => (
                    <li key={detail} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative pl-12 md:pl-16"
          >
            <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <Award size={10} className="text-primary" />
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="font-mono text-lg font-semibold text-foreground mb-4">
                Awards & Certifications
              </h3>
              <ul className="space-y-3">
                {awards.map((award, idx) => (
                  <li
                    key={award}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">
                      {idx < 2 ? <Trophy size={14} /> : <Award size={14} />}
                    </span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
