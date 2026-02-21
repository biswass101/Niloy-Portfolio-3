import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-mono">
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse-glow" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
