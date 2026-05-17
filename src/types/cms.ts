export type PortfolioImage = {
  src: string;
  alt: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  year: string;
  featured?: boolean;
  images: PortfolioImage[];
};

export type PortfolioExperience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  tech: string[];
};

export type PortfolioSkillCategory = {
  id: string;
  title: string;
  skills: string[];
};

export type PortfolioCertificationType = "award" | "certification";
export type PortfolioCertificationStatus = "completed" | "in_progress";

export type PortfolioCertification = {
  id: string;
  title: string;
  issuer: string;
  period: string;
  type: PortfolioCertificationType;
  status: PortfolioCertificationStatus;
  details: string;
  credentialUrl?: string;
  images: PortfolioImage[];
};

export type PortfolioHeroSocialLink = {
  label: string;
  href: string;
  iconUrl?: string;
  iconPublicId?: string;
};

export type PortfolioHeroContent = {
  greeting: string;
  firstName: string;
  highlightedName: string;
  titles: string[];
  summary: string;
  resumeUrl: string;
  resumePublicId?: string;
  location: string;
  socials: PortfolioHeroSocialLink[];
};

export type PortfolioAboutContent = {
  locationTitle: string;
  coordinates: string;
  timezone: string;
  brief: string;
  quote: string;
  growth: string;
  focus: string;
  craft: string;
  mapImageUrl?: string;
  mapImagePublicId?: string;
};

export type PortfolioEducationContent = {
  title: string;
  organization: string;
  period: string;
  details: string[];
  backgroundImageUrl?: string;
};

export type PortfolioWorkflowStep = {
  label: string;
  iconUrl?: string;
};

export type PortfolioContactMethod = {
  label: string;
  value: string;
  href: string;
  iconUrl?: string;
};

export type PortfolioContactContent = {
  intro: string;
  workflowSteps: PortfolioWorkflowStep[];
  contacts: PortfolioContactMethod[];
};

export type PortfolioContent = {
  hero: PortfolioHeroContent;
  about: PortfolioAboutContent;
  education: PortfolioEducationContent;
  contact: PortfolioContactContent;
  projects: PortfolioProject[];
  experiences: PortfolioExperience[];
  skillCategories: PortfolioSkillCategory[];
  certifications: PortfolioCertification[];
};
