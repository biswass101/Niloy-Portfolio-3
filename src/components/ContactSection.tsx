import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Bug,
  CheckCheck,
  Github,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  Rocket,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

const workflowSteps: { label: string; icon: LucideIcon }[] = [
  { label: "Idea", icon: Lightbulb },
  { label: "Plan", icon: ScrollText },
  { label: "Brainstorm + AI Help", icon: BrainCircuit },
  { label: "Code Review", icon: CheckCheck },
  { label: "Test", icon: Bug },
  { label: "Learning", icon: GraduationCap },
  { label: "Delivery", icon: Rocket },
];

const VIEWPORT_WIDTH = 960;
const VIEWPORT_HEIGHT = 160;
const WAVE_START_X = 110;
const WAVE_END_X = 850;
const WAVE_MID_Y = 80;
const WAVE_AMPLITUDE = 42;
const WAVE_CYCLES = 3;
const STEP_T_POSITIONS = [0, 1 / 12, 3 / 12, 5 / 12, 7 / 12, 9 / 12, 1];

const yOnWave = (t: number) => WAVE_MID_Y + WAVE_AMPLITUDE * -Math.sin(2 * Math.PI * WAVE_CYCLES * t);
const fmt = (value: number) => Number(value.toFixed(3));

const workflowNodes = workflowSteps.map((step, index) => {
  const t = STEP_T_POSITIONS[index] ?? 0;
  const x = fmt(WAVE_START_X + (WAVE_END_X - WAVE_START_X) * t);
  const y = fmt(yOnWave(t));
  return { ...step, x, y };
});

const buildWavePath = (samples = 180) => {
  let path = "";

  for (let index = 0; index <= samples; index += 1) {
    const t = index / samples;
    const x = fmt(WAVE_START_X + (WAVE_END_X - WAVE_START_X) * t);
    const y = fmt(yOnWave(t));
    path += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return path;
};

const contacts = [
  {
    label: "Mail",
    value: "biswassnaeemcse@gmail.com",
    href: "mailto:biswassnaeemcse@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/biswass101",
    href: "https://github.com/biswass101",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/niloy097",
    href: "https://linkedin.com/in/niloy097",
    icon: Linkedin,
  },
];

const ContactSection = () => {
  const workflowScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = workflowScrollerRef.current;
    if (!scroller) return;

    let frameId = 0;
    let lastTs = 0;
    let pauseUntil = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animate = (timestamp: number) => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const isSmallDevice = window.innerWidth < 768;

      if (prefersReducedMotion.matches || !isSmallDevice || maxScrollLeft <= 0) {
        if (!isSmallDevice && scroller.scrollLeft !== 0) {
          scroller.scrollLeft = 0;
        }
        lastTs = timestamp;
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      if (lastTs === 0) lastTs = timestamp;

      if (timestamp >= pauseUntil) {
        const delta = timestamp - lastTs;
        const speedPxPerSecond = 40;
        scroller.scrollLeft += (speedPxPerSecond * delta) / 1000;

        if (scroller.scrollLeft >= maxScrollLeft - 0.5) {
          scroller.scrollLeft = 0;
          pauseUntil = timestamp + 550;
        }
      }

      lastTs = timestamp;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">Let&apos;s Collaborate</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-3">Get In Touch</h2>
          <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            I enjoy working on meaningful products from idea to delivery. Here is the workflow I usually follow.
          </p>
          <div className="w-20 h-0.5 bg-primary/50 mt-5" />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl glass p-5 md:p-8"
        >
          <p className="text-primary text-xs uppercase tracking-[0.18em] font-mono mb-6">Workflow</p>

          <div ref={workflowScrollerRef} className="relative overflow-x-auto pb-2 md:overflow-hidden">
            <div className="relative h-60 w-[960px] max-w-none md:w-full md:max-w-[960px] mx-auto">
              <svg
                viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
                className="pointer-events-none absolute inset-x-0 top-10 h-[160px] w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={buildWavePath()}
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d={buildWavePath()}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="7 8"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -72 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.45))" }}
                />
              </svg>

              <div className="absolute inset-0">
                {workflowNodes.map((step, idx) => {
                  const Icon = step.icon;
                  const isUpper = step.y < VIEWPORT_HEIGHT / 2;
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ y: -3 }}
                      className="group absolute -translate-x-1/2"
                      style={{ left: `${(step.x / VIEWPORT_WIDTH) * 100}%`, top: `${step.y + 40}px` }}
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-primary mx-auto shadow-[0_0_12px_hsl(var(--primary)/0.8)]" />
                      <div
                        className={`whitespace-nowrap rounded-md border border-primary/25 bg-card/75 px-2.5 py-1.5 text-[10px] md:text-xs font-mono text-primary backdrop-blur-sm transition-colors duration-300 group-hover:bg-primary/15 ${isUpper ? "-translate-y-[54px]" : "translate-y-[14px]"}`}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Icon size={12} />
                          {step.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl glass p-5 md:p-8"
        >
          <h3 className="font-mono text-primary text-sm uppercase tracking-[0.18em] mb-5">Hit me up</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Mail" ? undefined : "_blank"}
                rel={label === "Mail" ? undefined : "noopener noreferrer"}
                className="group rounded-lg border border-border/70 bg-card/30 p-4 transition-all duration-300 hover:border-primary/35 hover:bg-primary/10"
              >
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Icon size={16} />
                  <p className="font-mono text-xs uppercase tracking-[0.14em]">{label}</p>
                </div>
                <p className="text-sm text-muted-foreground break-all transition-colors duration-300 group-hover:text-foreground/90">
                  {value}
                </p>
              </a>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ContactSection;
