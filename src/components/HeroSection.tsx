"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ExternalLink, FileText, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { PortfolioHeroContent } from "@/types/cms";

type HeroSectionProps = {
  hero: PortfolioHeroContent;
};

const HeroSection = ({ hero }: HeroSectionProps) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = hero.titles[titleIndex] || "";
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
            setTitleIndex((prev) => (prev + 1) % Math.max(hero.titles.length, 1));
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, hero.titles, isDeleting, titleIndex]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#projects");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
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
            {hero.greeting}
          </motion.p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-mono">
            <span className="text-foreground">{hero.firstName}</span>{" "}
            <span className="text-gradient">{hero.highlightedName}</span>
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
            {hero.summary}
          </p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg neon-border bg-primary/12 px-5 py-2.5 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary/20"
            >
              <FileText size={16} />
              Resume &amp; CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {hero.socials.map(({ href, label, iconUrl }) => {
              const Icon =
                label === "GitHub"
                  ? Github
                  : label === "LinkedIn"
                    ? Linkedin
                    : label === "Email"
                      ? Mail
                      : label === "Website"
                        ? ExternalLink
                        : LinkIcon;

              return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center rounded-lg neon-border bg-card/50 px-3 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={label}
              >
                {iconUrl ? (
                  <Image
                    src={iconUrl}
                    alt={`${label} icon`}
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0 object-contain"
                  />
                ) : (
                  <Icon size={20} className="shrink-0" />
                )}
                <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-24 group-hover:opacity-100">
                  {label}
                </span>
              </a>
              );
            })}
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MapPin size={14} className="text-primary" />
            <span>{hero.location}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToNextSection}
            aria-label="Go to next section"
          >
            <span className="flex h-10 w-6 justify-center rounded-full border-2 border-primary/30 pt-2 transition-colors hover:border-primary/70">
              <span className="h-2 w-1 rounded-full bg-primary animate-pulse-glow" />
            </span>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-mono text-xs">
          Click to open Projects
        </TooltipContent>
      </Tooltip>
    </section>
  );
};

export default HeroSection;
