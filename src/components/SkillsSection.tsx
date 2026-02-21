import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Nuxt.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "MongoDB", "PostgreSQL"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "CI/CD", "Linux", "AWS", "Kubernetes", "PM2", "Redis", "Git"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
            <span className="text-primary">02.</span> Skills
          </h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="glass rounded-lg p-6"
            >
              <h3 className="font-mono text-primary text-sm uppercase tracking-widest mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-mono cursor-default border border-border hover:border-primary/40 hover:bg-primary/10 transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
