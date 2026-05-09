"use client";

import { motion } from "framer-motion";

type StarParticle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

type ShootingStar = {
  left: string;
  top: string;
  duration: number;
  delay: number;
  repeatDelay: number;
};

const starParticles: StarParticle[] = [
  { left: "4%", top: "9%", size: 2, duration: 3.6, delay: 0.2 },
  { left: "9%", top: "31%", size: 1, duration: 4.4, delay: 1.4 },
  { left: "14%", top: "17%", size: 2, duration: 4.1, delay: 0.8 },
  { left: "22%", top: "8%", size: 1, duration: 3.8, delay: 2.1 },
  { left: "28%", top: "26%", size: 2, duration: 4.6, delay: 1.9 },
  { left: "35%", top: "12%", size: 1, duration: 3.9, delay: 0.5 },
  { left: "42%", top: "20%", size: 2, duration: 4.8, delay: 1.2 },
  { left: "49%", top: "7%", size: 1, duration: 4.3, delay: 2.3 },
  { left: "56%", top: "18%", size: 2, duration: 3.7, delay: 0.9 },
  { left: "63%", top: "10%", size: 1, duration: 4.9, delay: 2.7 },
  { left: "71%", top: "23%", size: 2, duration: 4.2, delay: 1.6 },
  { left: "79%", top: "11%", size: 1, duration: 4, delay: 0.7 },
  { left: "86%", top: "27%", size: 2, duration: 4.5, delay: 2 },
  { left: "93%", top: "14%", size: 1, duration: 3.5, delay: 1.1 },
  { left: "6%", top: "52%", size: 1, duration: 4.2, delay: 1.4 },
  { left: "15%", top: "46%", size: 2, duration: 3.9, delay: 0.6 },
  { left: "24%", top: "58%", size: 1, duration: 4.7, delay: 2.4 },
  { left: "33%", top: "48%", size: 2, duration: 3.8, delay: 1.1 },
  { left: "45%", top: "54%", size: 1, duration: 4.5, delay: 2.8 },
  { left: "54%", top: "45%", size: 2, duration: 3.7, delay: 1.8 },
  { left: "66%", top: "55%", size: 1, duration: 4.6, delay: 0.9 },
  { left: "73%", top: "49%", size: 2, duration: 4, delay: 2.1 },
  { left: "82%", top: "57%", size: 1, duration: 4.4, delay: 1.5 },
  { left: "91%", top: "51%", size: 2, duration: 3.6, delay: 0.4 },
  { left: "12%", top: "78%", size: 2, duration: 4.8, delay: 0.3 },
  { left: "21%", top: "90%", size: 1, duration: 3.7, delay: 1.7 },
  { left: "30%", top: "82%", size: 2, duration: 4.2, delay: 2.2 },
  { left: "39%", top: "92%", size: 1, duration: 3.9, delay: 1 },
  { left: "48%", top: "80%", size: 2, duration: 4.7, delay: 2.5 },
  { left: "58%", top: "88%", size: 1, duration: 3.8, delay: 1.3 },
  { left: "67%", top: "79%", size: 2, duration: 4.1, delay: 0.6 },
  { left: "76%", top: "91%", size: 1, duration: 4.5, delay: 1.9 },
  { left: "85%", top: "83%", size: 2, duration: 3.6, delay: 2.6 },
  { left: "94%", top: "89%", size: 1, duration: 4.3, delay: 0.8 },
];

const shootingStars: ShootingStar[] = [
  { left: "12%", top: "6%", duration: 1.1, delay: 1.8, repeatDelay: 20 },
  { left: "54%", top: "14%", duration: 1.3, delay: 8.5, repeatDelay: 18 },
  { left: "74%", top: "9%", duration: 1.2, delay: 14.2, repeatDelay: 22 },
];

const UniverseBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_35%),radial-gradient(circle_at_80%_25%,hsl(var(--neon-purple)/0.12),transparent_30%),radial-gradient(circle_at_50%_75%,hsl(var(--primary)/0.1),transparent_40%)]" />

      <div className="absolute left-1/2 top-1/2 z-[1] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 md:h-[680px] md:w-[680px]">
        <motion.div
          className="absolute inset-[6%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full opacity-85" aria-hidden="true">
            <path
              d="M50 50 C52 50 54 52 54 54 C54 58 50 62 44 62 C36 62 30 56 30 48 C30 36 42 26 56 26 C72 26 84 40 84 58 C84 80 64 94 40 94 C16 94 2 74 2 48 C2 18 26 -2 58 -2"
              fill="none"
              stroke="hsl(var(--primary) / 0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="0.1 4.2"
            />
            <path
              d="M50 50 C52 50 54 52 54 54 C54 58 50 62 44 62 C36 62 30 56 30 48 C30 36 42 26 56 26 C72 26 84 40 84 58 C84 80 64 94 40 94 C16 94 2 74 2 48 C2 18 26 -2 58 -2"
              fill="none"
              stroke="hsl(var(--foreground) / 0.45)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="0.1 6"
              transform="rotate(120 50 50)"
            />
            <path
              d="M50 50 C52 50 54 52 54 54 C54 58 50 62 44 62 C36 62 30 56 30 48 C30 36 42 26 56 26 C72 26 84 40 84 58 C84 80 64 94 40 94 C16 94 2 74 2 48 C2 18 26 -2 58 -2"
              fill="none"
              stroke="hsl(var(--neon-purple) / 0.42)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="0.1 6.5"
              transform="rotate(240 50 50)"
            />
          </svg>
        </motion.div>
      </div>

      {starParticles.map((star, idx) => (
        <motion.span
          key={`${star.left}-${star.top}-${idx}`}
          className="absolute rounded-full bg-foreground/90"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.25, 0.95, 0.25],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {shootingStars.map((shootingStar, idx) => (
        <motion.span
          key={`${shootingStar.left}-${shootingStar.top}-${idx}`}
          className="absolute h-px w-20 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0"
          style={{ left: shootingStar.left, top: shootingStar.top, rotate: "-25deg" }}
          initial={{ x: -120, y: -40, opacity: 0 }}
          animate={{ x: [0, 200], y: [0, 140], opacity: [0, 1, 0] }}
          transition={{
            duration: shootingStar.duration,
            delay: shootingStar.delay,
            repeat: Infinity,
            repeatDelay: shootingStar.repeatDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default UniverseBackground;
