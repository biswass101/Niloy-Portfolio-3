import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "portfolio_cms";
const CMS_DOC_KEY = "main";

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment variables");
  process.exit(1);
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Missing Cloudinary credentials in environment variables");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const projectSeeds = [
  {
    id: "autopingai-social-media-automation-platform",
    title: "AutoPingAi - Social Media Automation Platform",
    description:
      "Chatbot integrating OpenAI with Meta platforms for automated customer messaging, order handling, and comment replies.",
    tech: ["Node.js", "OpenAI", "Meta APIs", "MongoDB", "Redis"],
    live: "https://autopingai.com",
    github: "",
    year: "2025",
    featured: true,
    images: [
      { path: "src/assets/projects/autopingai/auto-ping-ai-landing.png", alt: "AutoPing AI landing page preview" },
      { path: "src/assets/projects/autopingai/autoPingDashboard.png", alt: "AutoPing AI dashboard preview" },
      { path: "src/assets/projects/autopingai/autoPingPageList.png", alt: "AutoPing AI page list preview" },
      { path: "src/assets/projects/autopingai/autoPingSystemConfig.png", alt: "AutoPing AI system configuration preview" },
    ],
  },
  {
    id: "bashaai-ai-integrated-room-finder",
    title: "BashaAi - AI-Integrated Room Finder",
    description: "Find, list, and manage rentals with AI-powered search and messaging.",
    tech: ["Next.js", "Node.js", "OpenAI", "PSQL + Pg Vector", "Tailwind CSS", "Socket.io"],
    live: "https://bashaai.vercel.app",
    github: "https://github.com/biswass101/basaai-client.git",
    year: "2026",
    featured: true,
    images: [
      { path: "src/assets/projects/bashaai/bashaai.png", alt: "BashaAi room finder application preview" },
      { path: "src/assets/projects/bashaai/bashaAiChat.png", alt: "BashaAi chat interface preview" },
      { path: "src/assets/projects/bashaai/bashaAiDashboard.png", alt: "BashaAi dashboard preview" },
      { path: "src/assets/projects/bashaai/bashaAiListingDetails.png", alt: "BashaAi listing details preview" },
      { path: "src/assets/projects/bashaai/bashaAiListings.png", alt: "BashaAi listings preview" },
      {
        path: "src/assets/projects/bashaai/bashaAiRealTimeListerChatting.png",
        alt: "BashaAi real-time listing chatting preview",
      },
    ],
  },
  {
    id: "portfolio-management-platform",
    title: "Portfolio Management Platform",
    description:
      "Portfolio management with profile and section management, JWT auth, and Cloudinary integration.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://manage-grabbi.vercel.app",
    github: "",
    year: "2025",
    featured: true,
    images: [
      {
        path: "src/assets/projects/portfolio-management/portfolioManageManageMent.png",
        alt: "Portfolio management platform dashboard preview",
      },
    ],
  },
  {
    id: "shayeri-collection-poetry-sharing-platform-video-streaming",
    title: "Shayeri Collection - Poetry Sharing Platform(Video Streaming)",
    description:
      "Video streaming platform for sharing and discovering poetry, featuring user profiles, video uploads, and interactive features.",
    tech: ["React.js", "Node.js", "JWT", "Cloudinary"],
    live: "https://shayeri.niloybiswass.xyz",
    github: "https://github.com/biswass101/Shayeri-Collection-Client.git",
    year: "2026",
    featured: true,
    images: [
      { path: "src/assets/projects/shayeri-collection/shayeri_home.png", alt: "Shayeri Collection homepage preview" },
      {
        path: "src/assets/projects/shayeri-collection/shayeri_dashboard.png",
        alt: "Shayeri Collection dashboard preview",
      },
      {
        path: "src/assets/projects/shayeri-collection/shayeri_video_management.png",
        alt: "Shayeri Collection video management preview",
      },
    ],
  },
  {
    id: "gigabook-social-media-platform",
    title: "GigaBook - Social Media Platform",
    description:
      "Lightweight social platform enabling user follow systems, post creation, editing, and profile management.",
    tech: ["Next.js", "NeonDB", "Prisma", "shadcn/ui"],
    live: "https://giga-book.vercel.app",
    github: "https://github.com/biswass101/GigaBook-Social-media",
    year: "2025",
    featured: true,
    images: [
      { path: "src/assets/projects/gigabook/gigabook.png", alt: "GigaBook social media platform interface preview" },
    ],
  },
  {
    id: "image-to-text-converter",
    title: "Image to Text Converter",
    description: "Convert images to text using OCR technology.",
    tech: ["React Js", "MongoDB", "Node.js", "OpenAI"],
    live: "https://image-to-text-converter-client.vercel.app/login",
    github: "https://github.com/biswass101/ImageToTextConverterClient.git",
    year: "2026",
    featured: true,
    images: [
      {
        path: "src/assets/projects/image-to-text-converter/image_to_Text.png",
        alt: "Image to Text Converter landing page preview",
      },
      {
        path: "src/assets/projects/image-to-text-converter/image_to_text_home.png",
        alt: "Image to Text Converter homepage preview",
      },
      {
        path: "src/assets/projects/image-to-text-converter/image_to_text_full_view.png",
        alt: "Image to Text Converter full view preview",
      },
      {
        path: "src/assets/projects/image-to-text-converter/image_to_text_converting_result.png",
        alt: "Image to Text Converter OCR result preview",
      },
    ],
  },
  {
    id: "madrasa-management-system",
    title: "Madrasa Management System",
    description:
      "Rebuilt frontend and backend using Next.js and Node.js, improving deployment stability and performance.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://online-quran-academy-two.vercel.app/",
    github: "",
    year: "2025",
    featured: true,
    images: [
      {
        path: "src/assets/projects/madrasha-management/madrasha.png",
        alt: "Madrasa management system dashboard preview",
      },
    ],
  },
  {
    id: "travel-agency-portfolio-bdigo",
    title: "Travel Agency Portfolio (BdiGo)",
    description:
      "Frontend-focused travel agency portfolio with responsive layouts, animations, and interactive UI using Nuxt.js and Motion.js.",
    tech: ["Nuxt.js", "Vue.js", "Motion.js", "CSS"],
    live: "https://bdigo.com",
    github: "",
    year: "2025",
    featured: true,
    images: [
      { path: "src/assets/projects/bdigo/bdigo.png", alt: "BdiGo travel agency portfolio homepage preview" },
    ],
  },
];

const certificationSeeds = [
  {
    id: "ostad-mastering-devops",
    title: "Mastering DevOps Course",
    issuer: "Ostad",
    period: "2026",
    type: "certification",
    status: "completed",
    details:
      "Completed hands-on learning in CI/CD pipelines, Docker, deployment automation, and operational best practices.",
    credentialUrl: "",
    images: [
      {
        path: "src/assets/certifications/devops_certificate.png",
        alt: "Mastering DevOps course completion certificate from Ostad",
      },
    ],
  },
  {
    id: "returnhex-internship-certificate",
    title: "Software Developer Intern Completion Certificate",
    issuer: "ReturnHex",
    period: "2025",
    type: "certification",
    status: "completed",
    details:
      "Completed internship milestones across backend and frontend deliverables, following production workflows and code review standards.",
    credentialUrl: "",
    images: [
      {
        path: "src/assets/certifications/returnhex_internship_certificate.png",
        alt: "Software Developer Intern completion certificate from ReturnHex",
      },
    ],
  },
  {
    id: "icpc-asia-dhaka-2025",
    title: "ICPC Asia Dhaka Regional Onsite Contest-2025",
    issuer: "ICPC Asia Dhaka Regional",
    period: "2025",
    type: "award",
    status: "completed",
    details:
      "Selected and participated in the onsite regional contest, practicing team strategy, algorithm design, and high-pressure debugging.",
    credentialUrl: "",
    images: [
      { path: "src/assets/certifications/icpc_2025_certificate.jpeg", alt: "ICPC Asia Dhaka Regional 2025 participation certificate" },
      { path: "src/assets/certifications/contest_card.jpeg", alt: "Contest card from programming competition event" },
      { path: "src/assets/certifications/contestents_all.jpeg", alt: "Group photo of programming contest participants" },
      { path: "src/assets/certifications/while_contest.jpeg", alt: "Programming contest in progress" },
    ],
  },
  {
    id: "code-clash-2025-winner",
    title: "Winner, Intra-Department Code Clash Programming Contest-2025",
    issuer: "City University, CSE Department",
    period: "2025",
    type: "award",
    status: "completed",
    details:
      "Achieved first position by solving complex competitive programming challenges with strong time and memory optimization.",
    credentialUrl: "",
    images: [
      {
        path: "src/assets/certifications/code_clash_certificate.jpeg",
        alt: "Code Clash 2025 winner certificate from City University CSE Department",
      },
    ],
  },
  {
    id: "code-carnival-2025-winner",
    title: "Winner, Intra-Department Code Carnival Programming Contest-2025",
    issuer: "City University, CSE Department",
    period: "2025",
    type: "award",
    status: "completed",
    details:
      "Achieved first position by solving complex competitive programming challenges with strong time and memory optimization.",
    credentialUrl: "",
    images: [
      {
        path: "src/assets/certifications/code_and_creativity_carnival_programming_contest_2025.jpeg",
        alt: "Code and Creativity Carnival Programming Contest 2025 winner certificate from City University CSE Department",
      },
    ],
  },
];

const uploadCache = new Map();

const uploadLocalImage = async (relativePath, folder) => {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const cacheKey = `${folder}:${absolutePath}`;

  if (uploadCache.has(cacheKey)) {
    return uploadCache.get(cacheKey);
  }

  const fileBuffer = await fs.readFile(absolutePath);

  const secureUrl = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error(`Cloudinary upload failed for ${relativePath}`));
          return;
        }

        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });

  uploadCache.set(cacheKey, secureUrl);
  console.log(`Uploaded: ${relativePath} -> ${secureUrl}`);
  return secureUrl;
};

const buildSeedContent = async () => {
  const [mapImageUrl, backgroundImageUrl] = await Promise.all([
    uploadLocalImage("src/assets/bangladesh.jpg", "portfolio-cms/seed/about"),
    uploadLocalImage("src/assets/city_uni.jpg", "portfolio-cms/seed/education"),
  ]);

  const projects = await Promise.all(
    projectSeeds.map(async (project) => ({
      ...project,
      images: await Promise.all(
        project.images.map(async (image) => ({
          src: await uploadLocalImage(image.path, "portfolio-cms/seed/projects"),
          alt: image.alt,
        }))
      ),
    }))
  );

  const certifications = await Promise.all(
    certificationSeeds.map(async (certification) => ({
      ...certification,
      images: await Promise.all(
        certification.images.map(async (image) => ({
          src: await uploadLocalImage(image.path, "portfolio-cms/seed/certifications"),
          alt: image.alt,
        }))
      ),
    }))
  );

  return {
    hero: {
      greeting: "< Hello World />",
      firstName: "Naeem Biswass",
      highlightedName: "Niloy",
      titles: ["Full Stack Developer", "Software Engineer", "MERN Stack Expert", "DevOps Enthusiast"],
      summary:
        "Full Stack Developer with hands-on experience in MERN stack, DevOps fundamentals, and competitive programming. Building scalable solutions from Dhaka, Bangladesh.",
      resumeUrl: "/resume.pdf",
      location: "Dhaka, Bangladesh",
      socials: [
        { label: "GitHub", href: "https://github.com/biswass101", iconUrl: "" },
        { label: "LinkedIn", href: "https://linkedin.com/in/niloy097", iconUrl: "" },
        { label: "Email", href: "mailto:biswassnaeemcse@gmail.com", iconUrl: "" },
        { label: "Website", href: "https://niloybiswass.xyz", iconUrl: "" },
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
      mapImageUrl,
    },
    education: {
      title: "B.Sc. in Computer Science and Engineering",
      organization: "City University, Dhaka",
      period: "July 2022 - Present",
      details: [
        "8th Semester - CGPA: 3.50/4.00",
        "Core focus: OOP, Databases, Data Structures, Algorithms, OS, Networks, ML",
      ],
      backgroundImageUrl,
    },
    contact: {
      intro:
        "I enjoy working on meaningful products from idea to delivery. Here is the workflow I usually follow.",
      workflowSteps: [
        { label: "Idea", iconUrl: "" },
        { label: "Plan", iconUrl: "" },
        { label: "Brainstorm + AI Help", iconUrl: "" },
        { label: "Code Review", iconUrl: "" },
        { label: "Test", iconUrl: "" },
        { label: "Learning", iconUrl: "" },
        { label: "Delivery", iconUrl: "" },
      ],
      contacts: [
        {
          label: "Mail",
          value: "biswassnaeemcse@gmail.com",
          href: "mailto:biswassnaeemcse@gmail.com",
          iconUrl: "",
        },
        {
          label: "GitHub",
          value: "github.com/biswass101",
          href: "https://github.com/biswass101",
          iconUrl: "",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/niloy097",
          href: "https://linkedin.com/in/niloy097",
          iconUrl: "",
        },
      ],
    },
    projects,
    experiences: [
      {
        id: "associate-software-engineer-returnhex",
        title: "Associate Software Engineer",
        company: "ReturnHex",
        location: "Uttara (Remote)",
        period: "Oct 2025 - Present",
        highlights: [
          "Built v1 of a social media chatbot integrating OpenAI with Meta platforms for automated messaging and order handling.",
          "Implemented image/voice processing and stabilized Meta Webhook integrations.",
          "Reduced OpenAI token usage by 30% through optimized prompting; introduced Redis caching and rate limiting.",
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
        ],
        tech: ["Next.js", "Nuxt.js", "Node.js", "MongoDB", "NestJS", "PostgreSQL"],
      },
    ],
    skillCategories: [
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
    ],
    certifications,
  };
};

const run = async () => {
  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    bufferCommands: false,
  });

  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection is not ready");

  const seedContent = await buildSeedContent();

  const now = new Date();
  const sectionCollections = [
    { name: "herocontents", content: seedContent.hero },
    { name: "aboutcontents", content: seedContent.about },
    { name: "educationcontents", content: seedContent.education },
    { name: "contactcontents", content: seedContent.contact },
    { name: "projectscontents", content: seedContent.projects },
    { name: "experiencescontents", content: seedContent.experiences },
    { name: "skillcategoriescontents", content: seedContent.skillCategories },
    { name: "certificationscontents", content: seedContent.certifications },
  ];

  await Promise.all(
    sectionCollections.map((section) =>
      db.collection(section.name).updateOne(
        { key: CMS_DOC_KEY },
        {
          $set: {
            key: CMS_DOC_KEY,
            content: section.content,
            updatedBy: "seed-script",
            updatedAt: now,
          },
          $setOnInsert: {
            createdAt: now,
          },
        },
        { upsert: true }
      )
    )
  );

  const adminEmail = String(process.env.SEED_ADMIN_EMAIL || "")
    .toLowerCase()
    .trim();
  const adminPassword = String(process.env.SEED_ADMIN_PASSWORD || "").trim();

  if (adminEmail && adminPassword.length >= 8) {
    const admins = db.collection("adminusers");
    const existing = await admins.findOne({ email: adminEmail });

    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await admins.insertOne({
        email: adminEmail,
        passwordHash,
        createdAt: now,
        updatedAt: now,
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists: ${adminEmail}`);
    }
  } else if (adminEmail || adminPassword) {
    console.log("Skipped admin creation. Set both SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (min 8 chars).");
  }

  console.log("Portfolio CMS content seeded successfully.");
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Seed failed:", error.message || error);
  await mongoose.disconnect();
  process.exit(1);
});
