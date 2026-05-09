export type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: "Social Media Automation Platform",
    description:
      "Chatbot integrating OpenAI with Meta platforms for automated customer messaging, order handling, and comment replies.",
    tech: ["Node.js", "OpenAI", "Meta APIs", "MongoDB", "Redis"],
    live: "https://autopingai.com",
    year: "2025",
  },
  {
    title: "Education Management System",
    description:
      "Rebuilt frontend and backend using Next.js and Node.js, improving deployment stability and performance.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://onlinequranacademybd.com",
    year: "2025",
  },
  {
    title: "Travel Agency Portfolio (BdiGo)",
    description:
      "Frontend-focused travel agency portfolio with responsive layouts, animations, and interactive UI using Nuxt.js and Motion.js.",
    tech: ["Nuxt.js", "Vue.js", "Motion.js", "CSS"],
    live: "https://bdigo.com",
    year: "2025",
  },
  {
    title: "GigaBook - Social Media Platform",
    description:
      "Lightweight social platform enabling user follow systems, post creation, editing, and profile management.",
    tech: ["Next.js", "NeonDB", "Prisma", "shadcn/ui"],
    live: "https://giga-book.vercel.app",
    github: "https://github.com/biswass101/GigaBook-Social-media",
    year: "2025",
  },
  {
    title: "Portfolio Management Platform",
    description:
      "Portfolio management with profile and section management, JWT auth, and Cloudinary integration.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://manage-grabbi.vercel.app",
    year: "2025",
  },
];
