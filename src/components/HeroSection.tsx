"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import profileImg from "@/assets/profile.jpeg";

const titles = [
  "Full Stack Developer",
  "Software Engineer",
  "MERN Stack Expert",
  "DevOps Enthusiast",
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

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

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 px-6 max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Left: Text content */}
        <motion.div
          className="flex-1 text-center md:text-left"
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

          <div className="h-10 md:h-12 flex items-center justify-center md:justify-start mb-8">
            <span className="font-mono text-xl md:text-2xl text-primary neon-text">
              {displayText}
            </span>
            <motion.span
              className="w-0.5 h-6 md:h-8 bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            Full Stack Developer with hands-on experience in MERN stack, DevOps
            fundamentals, and competitive programming. Building scalable
            solutions from Dhaka, Bangladesh.
          </p>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-4 mb-8"
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
            className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MapPin size={14} className="text-primary" />
            <span>Dhaka, Bangladesh</span>
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/60 via-primary/20 to-primary/60 blur-md animate-pulse" />
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl">
              <Image
                src={profileImg}
                alt="Naeem Biswass Niloy"
                fill
                sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
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
