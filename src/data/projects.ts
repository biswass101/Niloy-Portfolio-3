import type { StaticImageData } from "next/image";

import autoPingAiImage from "@/assets/projects/autopingai/auto-ping-ai-landing.png";
import autoPingAiDashBoradImage from "@/assets/projects/autopingai/autoPingDashboard.png";
import autoPingPageListImage from "@/assets/projects/autopingai/autoPingPageList.png";
import autoPingSystemConfigImage from "@/assets/projects/autopingai/autoPingSystemConfig.png";

import madrashaImage from "@/assets/projects/madrasha-management/madrasha.png";
import bdigoImage from "@/assets/projects/bdigo/bdigo.png";
import gigabookImage from "@/assets/projects/gigabook/gigabook.png";


import bashaAiImage from "@/assets/projects/bashaai/bashaai.png";
import bashaAiChat from "@/assets/projects/bashaai/bashaAiChat.png";
import bashaAiDashboard from "@/assets/projects/bashaai/bashaAiDashboard.png";
import bashaAiListingDetails from "@/assets/projects/bashaai/bashaAiListingDetails.png";
import bashaAiListings from "@/assets/projects/bashaai/bashaAiListings.png";
import bashaAiRealTimeListerChatting from "@/assets/projects/bashaai/bashaAiRealTimeListerChatting.png";

import portfolioManagementImage from "@/assets/projects/portfolio-management/portfolioManageManageMent.png";
import shayeriHomeImage from "@/assets/projects/shayeri-collection/shayeri_home.png";
import shayeriDashboardImage from "@/assets/projects/shayeri-collection/shayeri_dashboard.png";
import shayeriVideoManagementImage from "@/assets/projects/shayeri-collection/shayeri_video_management.png";
import imageToTextHomeImage from "@/assets/projects/image-to-text-converter/image_to_text_home.png";
import imageToTextFullViewImage from "@/assets/projects/image-to-text-converter/image_to_text_full_view.png";
import imageToTextConvertingResultImage from "@/assets/projects/image-to-text-converter/image_to_text_converting_result.png";
import imageToTextImage from "@/assets/projects/image-to-text-converter/image_to_Text.png";

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
    title: "AutoPingAi - Social Media Automation Platform",
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
    github: "https://github.com/biswass101/basaai-client.git",
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
    title: "Shayeri Collection - Poetry Sharing Platform(Video Streaming)",
    description:
      "Video streaming platform for sharing and discovering poetry, featuring user profiles, video uploads, and interactive features.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://shayeri.niloybiswass.xyz",
    github: "https://github.com/biswass101/Shayeri-Collection-Client.git",
    year: "2026",
    images: [
      { src: shayeriHomeImage, alt: "Shayeri Collection homepage preview" },
      { src: shayeriDashboardImage, alt: "Shayeri Collection dashboard preview" },
      { src: shayeriVideoManagementImage, alt: "Shayeri Collection video management preview" },
    ]
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
    title: "Image to Text Converter",
    description:
      "Convert images to text using OCR technology.",
    tech: ["React Js", "MongoDB", "Node.js", "OpenAI"],
    live: "https://image-to-text-converter-client.vercel.app/login",
    github: "https://github.com/biswass101/ImageToTextConverterClient.git",
    year: "2026",
    images: [
      { src: imageToTextImage, alt: "Image to Text Converter landing page preview" },
      { src: imageToTextHomeImage, alt: "Image to Text Converter homepage preview" },
      { src: imageToTextFullViewImage, alt: "Image to Text Converter full view preview" },
      { src: imageToTextConvertingResultImage, alt: "Image to Text Converter OCR result preview" },
    ],
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
