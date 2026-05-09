"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";

const titles = [
  "Full Stack Developer",
  "Software Engineer",
  "MERN Stack Expert",
  "DevOps Enthusiast",
];

type FloatingSkill = {
  name: string;
  iconClass?: string;
  iconText?: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
};

const floatingSkills: FloatingSkill[] = [
  { name: "JavaScript", iconClass: "devicon-javascript-plain", left: "7%", top: "20%", duration: 6.2, delay: 0.2 },
  { name: "TypeScript", iconClass: "devicon-typescript-plain", left: "14%", top: "58%", duration: 7.4, delay: 0.4 },
  { name: "React", iconClass: "devicon-react-original", left: "25%", top: "30%", duration: 6.7, delay: 0.7 },
  { name: "Next.js", iconClass: "devicon-nextjs-original", left: "34%", top: "68%", duration: 7.8, delay: 0.1 },
  { name: "Vue", iconClass: "devicon-vuejs-plain", left: "44%", top: "22%", duration: 6.6, delay: 0.8 },
  { name: "Node.js", iconClass: "devicon-nodejs-plain", left: "56%", top: "72%", duration: 8.1, delay: 0.3 },
  { name: "Express", iconClass: "devicon-express-original", left: "66%", top: "28%", duration: 6.9, delay: 0.5 },
  { name: "NestJS", iconClass: "devicon-nestjs-plain", left: "74%", top: "64%", duration: 7.2, delay: 0.9 },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain", left: "84%", top: "38%", duration: 7.6, delay: 0.6 },
  { name: "PostgreSQL", iconClass: "devicon-postgresql-plain", left: "90%", top: "58%", duration: 7.1, delay: 0.2 },
  { name: "Docker", iconClass: "devicon-docker-plain", left: "20%", top: "82%", duration: 8.3, delay: 0.4 },
  { name: "AWS", iconClass: "devicon-amazonwebservices-plain-wordmark", left: "79%", top: "14%", duration: 8.6, delay: 0.7 },
  { name: "Kubernetes", iconClass: "devicon-kubernetes-plain", left: "60%", top: "12%", duration: 7.3, delay: 0.3 },
  { name: "Redis", iconClass: "devicon-redis-plain", left: "40%", top: "86%", duration: 7.9, delay: 0.5 },
  { name: "CI/CD", iconClass: "devicon-githubactions-plain", left: "10%", top: "42%", duration: 6.8, delay: 0.9 },
  { name: "REST APIs", iconText: "API", left: "52%", top: "44%", duration: 7.5, delay: 0.6 },
  { name: "PM2", iconText: "PM2", left: "30%", top: "12%", duration: 6.5, delay: 0.2 },
  { name: "Git", iconClass: "devicon-git-plain", left: "69%", top: "86%", duration: 7.2, delay: 0.8 },
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
          if (displayText.length === currentTitle.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating tech stack icons */}
      {floatingSkills.map((skill) => (
        <motion.div
          key={skill.name}
          className="absolute z-[2]"
          style={{
            left: skill.left,
            top: skill.top,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 8, 0],
            rotate: [0, 5, 0],
            opacity: [0.45, 0.95, 0.45],
          }}
          transition={{
            duration: skill.duration,
            repeat: Infinity,
            delay: skill.delay,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.12 }}
        >
          <div className="hidden md:flex items-center justify-center rounded-xl border border-primary/30 bg-card/65 px-2.5 py-2 shadow-[0_0_18px_hsl(var(--primary)/0.25)] backdrop-blur-sm">
            {skill.iconClass ? (
              <i className={`${skill.iconClass} text-xl text-primary`} aria-hidden="true" />
            ) : (
              <span className="font-mono text-[11px] font-semibold text-primary tracking-wide">
                {skill.iconText}
              </span>
            )}
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 px-6 max-w-4xl w-full flex flex-col items-center text-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="font-mono text-primary text-sm md:text-base mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {"< Hello World />"}
          </motion.p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-mono">
            <span className="text-foreground">Naeem Biswass</span>{" "}
            <span className="text-gradient">Niloy</span>
          </h1>

          <div className="h-10 md:h-12 flex items-center justify-center mb-8">
            <span className="font-mono text-xl md:text-2xl text-primary neon-text">
              {displayText}
            </span>
            <motion.span
              className="w-0.5 h-6 md:h-8 bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Full Stack Developer with hands-on experience in MERN stack, DevOps
            fundamentals, and competitive programming. Building scalable
            solutions from Dhaka, Bangladesh.
          </p>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Github, href: "https://github.com/biswass101", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/niloy097", label: "LinkedIn" },
              { icon: Mail, href: "mailto:biswassnaeemcse@gmail.com", label: "Email" },
              { icon: ExternalLink, href: "https://niloybiswass.xyz", label: "Website" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg neon-border bg-card/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MapPin size={14} className="text-primary" />
            <span>Dhaka, Bangladesh</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
