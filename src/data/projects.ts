import type { StaticImageData } from "next/image";

import autoPingAiImage from "@/assets/projects/auto-ping-ai-landing.png";
import autoPingAiDashBoradImage from "@/assets/projects/autoPingDashboard.png";
import autoPingPageListImage from "@/assets/projects/autoPingPageList.png";
import autoPingSystemConfigImage from "@/assets/projects/autoPingSystemConfig.png";

import madrashaImage from "@/assets/projects/madrasha.png";
import bdigoImage from "@/assets/projects/bdigo.png";
import gigabookImage from "@/assets/projects/gigabook.png";


import bashaAiImage from "@/assets/projects/bashaai.png";
import bashaAiChat from "@/assets/projects/bashaAiChat.png";
import bashaAiDashboard from "@/assets/projects/bashaAiDashboard.png";
import bashaAiListingDetails from "@/assets/projects/bashaAiListingDetails.png";
import bashaAiListings from "@/assets/projects/bashaAiListings.png";
import bashaAiRealTimeListerChatting from "@/assets/projects/bashaAiRealTimeListerChatting.png";

import portfolioManagementImage from "@/assets/projects/portfolioManageManageMent.png";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  year: string;
  images: {
    src: StaticImageData;
    alt: string;
  }[];
};

export const projects: Project[] = [
  {
    title: "Social Media Automation Platform",
    description:
      "Chatbot integrating OpenAI with Meta platforms for automated customer messaging, order handling, and comment replies.",
    tech: ["Node.js", "OpenAI", "Meta APIs", "MongoDB", "Redis"],
    live: "https://autopingai.com",
    year: "2025",
    images: [
      {
        src: autoPingAiImage,
        alt: "AutoPing AI landing page preview"
      },
      { src: autoPingAiDashBoradImage, alt: "AutoPing AI dashboard preview" }
      ,
      { src: autoPingPageListImage, alt: "AutoPing AI page list preview" },
      { src: autoPingSystemConfigImage, alt: "AutoPing AI system configuration preview" },
    ],
  },
  {
    title: "BashaAi - AI-Integrated Room Finder",
    description:
      "Find, list, and manage rentals with AI-powered search and messaging.",
    tech: ["Next.js", "Node.js", "OpenAI", "PSQL + Pg Vector", "Tailwind CSS", "Socket.io"],
    live: "https://bashaai.vercel.app",
    year: "2026",
    images: [
      { src: bashaAiImage, alt: "BashaAi room finder application preview" },
      { src: bashaAiChat, alt: "BashaAi chat interface preview" },
      { src: bashaAiDashboard, alt: "BashaAi dashboard preview" },
      { src: bashaAiListingDetails, alt: "BashaAi listing details preview" },
      { src: bashaAiListings, alt: "BashaAi listings preview" },
      { src: bashaAiRealTimeListerChatting, alt: "BashaAi real-time listing chatting preview" }
    ],
  },
  {
    title: "Portfolio Management Platform",
    description:
      "Portfolio management with profile and section management, JWT auth, and Cloudinary integration.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://manage-grabbi.vercel.app",
    year: "2025",
    images: [{ src: portfolioManagementImage, alt: "Portfolio management platform dashboard preview" }],
  },
  {
    title: "GigaBook - Social Media Platform",
    description:
      "Lightweight social platform enabling user follow systems, post creation, editing, and profile management.",
    tech: ["Next.js", "NeonDB", "Prisma", "shadcn/ui"],
    live: "https://giga-book.vercel.app",
    github: "https://github.com/biswass101/GigaBook-Social-media",
    year: "2025",
    images: [{ src: gigabookImage, alt: "GigaBook social media platform interface preview" }],
  },
  {
    title: "Madrasa Management System",
    description:
      "Rebuilt frontend and backend using Next.js and Node.js, improving deployment stability and performance.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://online-quran-academy-two.vercel.app/",
    year: "2025",
    images: [{ src: madrashaImage, alt: "Madrasa management system dashboard preview" }],
  },
  {
    title: "Travel Agency Portfolio (BdiGo)",
    description:
      "Frontend-focused travel agency portfolio with responsive layouts, animations, and interactive UI using Nuxt.js and Motion.js.",
    tech: ["Nuxt.js", "Vue.js", "Motion.js", "CSS"],
    live: "https://bdigo.com",
    year: "2025",
    images: [{ src: bdigoImage, alt: "BdiGo travel agency portfolio homepage preview" }],
  },

];
