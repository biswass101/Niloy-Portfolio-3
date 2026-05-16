export type SectionKey =
  | "overview"
  | "hero"
  | "about"
  | "education"
  | "contact"
  | "projects"
  | "experiences"
  | "skills"
  | "certifications";

export const sections: { key: SectionKey; label: string; help: string }[] = [
  { key: "overview", label: "Dashboard", help: "Analytics and quick health check" },
  { key: "hero", label: "Hero", help: "Homepage headline and social links" },
  { key: "about", label: "About", help: "Personal profile and map section" },
  { key: "education", label: "Education", help: "Degree and university details" },
  { key: "contact", label: "Contact", help: "Workflow and contact methods" },
  { key: "projects", label: "Projects", help: "Project cards with image gallery" },
  { key: "experiences", label: "Experiences", help: "Career timeline entries" },
  { key: "skills", label: "Skills", help: "Skill categories and tech tags" },
  { key: "certifications", label: "Certifications", help: "Awards and certificates" },
];

export const getSectionLabel = (section: SectionKey) =>
  sections.find((item) => item.key === section)?.label || "Section";

export const getSectionRoute = (section: SectionKey) => `/admin/${section}`;
