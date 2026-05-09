import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import {
  BriefcaseBusiness,
  Cpu,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type NavLinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const links: NavLinkItem[] = [
  { label: "home()", href: "#home", icon: House },
  { label: "skills()", href: "#skills", icon: Cpu },
  { label: "experience()", href: "#experience", icon: BriefcaseBusiness },
  { label: "projects()", href: "#projects", icon: FolderKanban },
  { label: "education()", href: "#education", icon: GraduationCap },
  { label: "contact()", href: "#contact", icon: Mail },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    },
    []
  );

  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }}>
      <div className="relative">
        <div className="glass inline-flex max-w-[calc(100vw-1.5rem)] items-center rounded-2xl px-4 py-3">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2"
            aria-label="Go to home"
          >
            <span className="font-mono text-lg font-bold text-primary neon-text">{"<N/>"}</span>
            <span className="font-mono text-xs md:text-sm text-foreground/90 tracking-wide">
              niloybiswass.xyz
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <span className="text-muted-foreground/60 font-mono text-sm" aria-hidden="true">
              |
            </span>
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLabel(link.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                  onFocus={() => setHoveredLabel(link.label)}
                  onBlur={() => setHoveredLabel(null)}
                  className="group flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-2 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  aria-label={link.label}
                >
                  <Icon size={16} className="shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap font-mono text-xs tracking-wide transition-all duration-300 ${
                      hoveredLabel === link.label
                        ? "ml-2 max-w-32 opacity-100"
                        : "ml-0 max-w-0 opacity-0"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Icon size={16} />
                  {link.label}
                </a>
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
