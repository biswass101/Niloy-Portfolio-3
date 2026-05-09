import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Target, Wrench, Quote } from "lucide-react";
import bangladeshMap from "@/assets/bangladesh.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-mono mb-3">Who am I</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">About Me</h2>
          <div className="w-20 h-0.5 bg-primary/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="group relative overflow-hidden rounded-lg glass p-6 md:col-span-2 lg:col-span-3 min-h-[250px]"
          >
            <Image
              src={bangladeshMap}
              alt="Bangladesh map"
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 blur-[2px] transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/22 via-background/6 to-background/12 opacity-45 transition-opacity duration-500 group-hover:opacity-28" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="inline-flex w-fit items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-primary backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55 mb-4">
                <MapPin size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Location</span>
              </div>

              <div className="space-y-2">
                <h3 className="inline-flex w-fit rounded-md bg-card/35 px-3 py-1.5 font-mono text-xl text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                  Dhaka, Bangladesh
                </h3>
                <p className="inline-flex w-fit rounded-md bg-card/35 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                  Coordinates: 23.8103° N, 90.4125° E
                </p>
                <p className="inline-flex w-fit rounded-md bg-card/35 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                  GMT Time Zone: GMT+6 (BST)
                </p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-lg glass p-6 md:col-span-2 lg:col-span-3"
          >
            <p className="text-primary text-xs uppercase tracking-[0.18em] font-mono mb-4">Brief</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              I am a software engineer who enjoys building useful digital products with clean architecture,
              scalable backend services, and thoughtful frontend experiences.
            </p>
            <blockquote className="border-l border-primary/40 pl-4 text-sm text-foreground/90 italic leading-relaxed">
              <Quote size={14} className="inline mr-2 text-primary" />
              Build with clarity, scale with discipline, and learn without ego.
            </blockquote>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-lg glass p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2 text-primary mb-3">
              <TrendingUp size={16} />
              <h3 className="font-mono text-sm uppercase tracking-[0.18em]">Growth</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I grow by shipping real projects, learning from feedback, and improving one technical skill at a
              time.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-lg glass p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2 text-primary mb-3">
              <Target size={16} />
              <h3 className="font-mono text-sm uppercase tracking-[0.18em]">Focus</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              My current focus is AI-backed applications, reliable backend systems, and performance-first product
              development.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-lg glass p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2 text-primary mb-3">
              <Wrench size={16} />
              <h3 className="font-mono text-sm uppercase tracking-[0.18em]">Craft</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I care about craft: maintainable code, meaningful abstractions, and user experiences that feel smooth
              and intentional.
            </p>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/profile"
            className="inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary/20"
          >
            View More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
