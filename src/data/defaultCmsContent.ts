import bangladeshMap from "@/assets/bangladesh.jpg";
import cityUniversity from "@/assets/city_uni.jpg";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";
import type {
  PortfolioCertification,
  PortfolioContent,
  PortfolioExperience,
  PortfolioProject,
  PortfolioSkillCategory,
} from "@/types/cms";

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const defaultProjects: PortfolioProject[] = projects.map((project) => ({
  id: toId(project.title),
  title: project.title,
  description: project.description,
  tech: project.tech,
  live: project.live,
  github: project.github,
  year: project.year,
  featured: true,
  images: project.images.map((image) => ({
    src: typeof image.src === "string" ? image.src : image.src.src,
    alt: image.alt,
  })),
}));

const defaultExperiences: PortfolioExperience[] = [
  {
    id: "associate-software-engineer-returnhex",
    title: "Associate Software Engineer",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "Oct 2025 - Present",
    highlights: [
      "Built v1 of a social media chatbot integrating OpenAI with Meta platforms (Facebook, Instagram) for automated messaging and order handling.",
      "Implemented image/voice message processing and stabilized Meta Webhook integrations.",
      "Reduced OpenAI token usage by 30% through optimized prompt engineering; introduced Redis caching and rate limiting.",
      "Contributing to v2 with BullMQ message queuing, Docker, CI/CD, and PM2 for scalability.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "OpenAI", "Redis", "BullMQ", "Docker"],
  },
  {
    id: "software-developer-intern-returnhex",
    title: "Software Developer Intern",
    company: "ReturnHex",
    location: "Uttara (Remote)",
    period: "April 2025 - Oct 2025",
    highlights: [
      "Rebuilt an Education Management System with Next.js, fixing deployment and codebase issues.",
      "Built a travel agency portfolio using Nuxt.js with animations and improved SEO.",
      "Contributed to backend development with Node.js, Express.js, and MongoDB.",
      "Initiated an MVP social media automation system with OpenAI APIs.",
    ],
    tech: ["Next.js", "Nuxt.js", "Node.js", "MongoDB", "NestJS", "PostgreSQL"],
  },
];

const defaultSkillCategories: PortfolioSkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["React.js", "Next.js", "Nuxt.js", "Vue.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "MongoDB", "PostgreSQL"],
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    skills: ["Docker", "CI/CD", "Linux", "AWS", "Kubernetes", "PM2", "Redis", "Git"],
  },
];

const defaultCertifications: PortfolioCertification[] = certifications.map((item) => ({
  ...item,
  images: item.images.map((image) => ({
    src: typeof image.src === "string" ? image.src : image.src.src,
    alt: image.alt,
  })),
}));

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    greeting: "< Hello World />",
    firstName: "Naeem Biswass",
    highlightedName: "Niloy",
    titles: ["Full Stack Developer", "Software Engineer", "MERN Stack Expert", "DevOps Enthusiast"],
    summary:
      "Full Stack Developer with hands-on experience in MERN stack, DevOps fundamentals, and competitive programming. Building scalable solutions from Dhaka, Bangladesh.",
    resumeUrl: "/resume.pdf",
    resumePublicId: "",
    location: "Dhaka, Bangladesh",
    socials: [
      { label: "GitHub", href: "https://github.com/biswass101", iconPublicId: "" },
      { label: "LinkedIn", href: "https://linkedin.com/in/niloy097", iconPublicId: "" },
      { label: "Email", href: "mailto:biswassnaeemcse@gmail.com", iconPublicId: "" },
      { label: "Website", href: "https://niloybiswass.xyz", iconPublicId: "" },
    ],
  },
  about: {
    locationTitle: "Dhaka, Bangladesh",
    coordinates: "23.8103° N, 90.4125° E",
    timezone: "GMT+6 (BST)",
    brief:
      "I am a software engineer who enjoys building useful digital products with clean architecture, scalable backend services, and thoughtful frontend experiences.",
    quote: "Build with clarity, scale with discipline, and learn without ego.",
    growth:
      "I grow by shipping real projects, learning from feedback, and improving one technical skill at a time.",
    focus:
      "My current focus is AI-backed applications, reliable backend systems, and performance-first product development.",
    craft:
      "I care about craft: maintainable code, meaningful abstractions, and user experiences that feel smooth and intentional.",
    mapImageUrl: bangladeshMap.src,
    mapImagePublicId: "",
  },
  education: {
    title: "B.Sc. in Computer Science and Engineering",
    organization: "City University, Dhaka",
    period: "July 2022 - Present",
    details: [
      "8th Semester · CGPA: 3.50/4.00",
      "Core focus: OOP, Databases, Data Structures, Algorithms, OS, Networks, ML",
    ],
    backgroundImageUrl: cityUniversity.src,
  },
  contact: {
    intro:
      "I enjoy working on meaningful products from idea to delivery. Here is the workflow I usually follow.",
    workflowSteps: [
      { label: "Idea" },
      { label: "Plan" },
      { label: "Brainstorm + AI Help" },
      { label: "Code Review" },
      { label: "Test" },
      { label: "Learning" },
      { label: "Delivery" },
    ],
    contacts: [
      {
        label: "Mail",
        value: "biswassnaeemcse@gmail.com",
        href: "mailto:biswassnaeemcse@gmail.com",
      },
      {
        label: "GitHub",
        value: "github.com/biswass101",
        href: "https://github.com/biswass101",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/niloy097",
        href: "https://linkedin.com/in/niloy097",
      },
    ],
  },
  projects: defaultProjects,
  experiences: defaultExperiences,
  skillCategories: defaultSkillCategories,
  certifications: defaultCertifications,
};
