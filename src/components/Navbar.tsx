"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Cpu,
  FolderKanban,
  House,
  Menu,
  Trophy,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

type NavLinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const links: NavLinkItem[] = [
  { label: "Home", href: "/", icon: House },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Experiences", href: "/experiences", icon: BriefcaseBusiness },
  { label: "Awards & Certifications", href: "/certifications", icon: Trophy },
  { label: "Skills", href: "/technical-expertise", icon: Cpu },
  { label: "About me", href: "/profile", icon: User },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const pathname = usePathname();

  const handleNavClick = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }}>
      <div className="relative">
        <div className="glass inline-flex max-w-[calc(100vw-1.5rem)] items-center rounded-2xl px-4 py-3">
          <Link
            href="/profile"
            className="group relative flex items-center gap-2 overflow-hidden rounded-lg px-2 py-1"
            aria-label="Go to profile"
          >
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(var(--primary)/0.2)] via-[hsl(var(--primary)/0.1)] to-[hsl(var(--neon-purple)/0.2)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-[hsl(var(--primary)/0.25)] via-[hsl(var(--primary)/0.14)] to-[hsl(var(--neon-purple)/0.24)] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />

            <span className="font-mono text-lg font-bold text-primary neon-text">{"<N/>"}</span>
            <span className="font-mono text-xs md:text-sm text-foreground/90 tracking-wide">
              niloybiswass.xyz
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <span className="text-muted-foreground/60 font-mono text-sm" aria-hidden="true">
              |
            </span>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => setHoveredLabel(link.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                  onFocus={() => setHoveredLabel(link.label)}
                  onBlur={() => setHoveredLabel(null)}
                  className={`group flex items-center rounded-full border px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_16px_hsl(var(--primary)/0.2)]"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                  aria-label={link.label}
                >
                  <Icon size={16} className="shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap font-mono text-xs tracking-wide transition-all duration-300 ${
                      hoveredLabel === link.label
                        ? "ml-2 max-w-56 opacity-100"
                        : "ml-0 max-w-0 opacity-0"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto md:hidden text-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass mt-2 rounded-xl p-4 flex flex-col gap-4"
          >
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`font-mono text-sm transition-colors flex items-center gap-2 ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
