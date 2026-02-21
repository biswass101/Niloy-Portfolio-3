import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy } from "lucide-react";

const awards = [
  "Participated at ICPC Asia Dhaka Regional Onsite Contest (2025)",
  "Winner, Intra-Department Code Clash Programming Contest (2025)",
  "Software Developer Intern Completion Certificate at ReturnHex",
  "Mastering DevOps Course – Ostad (In Progress)",
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
            <span className="text-primary">05.</span> Education & Awards
          </h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-lg p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="font-mono text-lg font-semibold text-foreground">
                B.Sc. in Computer Science and Engineering
              </h3>
              <p className="text-primary text-sm font-mono">
                City University, Dhaka
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                July 2022 - Present · 8th Semester · CGPA: 3.50/4.00
              </p>
              <p className="text-muted-foreground text-xs mt-3 font-mono">
                OOP · Databases · Data Structures · Algorithms · OS · Networks · ML
              </p>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-lg p-4 flex items-start gap-3"
            >
              <div className="text-primary mt-0.5">
                {idx < 2 ? <Trophy size={16} /> : <Award size={16} />}
              </div>
              <p className="text-sm text-muted-foreground">{award}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
