import type { StaticImageData } from "next/image";
import codeAndCreativityCarnivalContest from "@/assets/certifications/code_and_creativity_carnival_programming_contest_2025.jpeg";
import codeClashCertificate from "@/assets/certifications/code_clash_certificate.jpeg";
import contestCard from "@/assets/certifications/contest_card.jpeg";
import contestentsAll from "@/assets/certifications/contestents_all.jpeg";
import devopsCertificate from "@/assets/certifications/devops_certificate.png";
import icpcCertificate from "@/assets/certifications/icpc_2025_certificate.jpeg";
import returnhexInternshipCertificate from "@/assets/certifications/returnhex_internship_certificate.png";
import whileContest from "@/assets/certifications/while_contest.jpeg";

export type CertificationItemType = "award" | "certification";
export type CertificationImage = {
  src: StaticImageData;
  alt: string;
};

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  period: string;
  type: CertificationItemType;
  status: "completed" | "in_progress";
  details: string;
  credentialUrl?: string;
  images: CertificationImage[];
};

export const certifications: CertificationItem[] = [
  {
    id: "ostad-mastering-devops",
    title: "Mastering DevOps Course",
    issuer: "Ostad",
    period: "2026",
    type: "certification",
    status: "completed",
    details:
      `Completed hands-on learning in CI/CD pipelines, Docker, deployment automation, and operational best practices.`,
    images: [
      {
        src: devopsCertificate,
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
    images: [
      {
        src: returnhexInternshipCertificate,
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
    images: [
      {
        src: icpcCertificate,
        alt: "ICPC Asia Dhaka Regional 2025 participation certificate",
      },
      {
        src: contestCard,
        alt: "Contest card from programming competition event",
      },
      {
        src: contestentsAll,
        alt: "Group photo of programming contest participants",
      },
      {
        src: whileContest,
        alt: "Programming contest in progress",
      },
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
    images: [
      {
        src: codeClashCertificate,
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
    images: [
      {
        src: codeAndCreativityCarnivalContest,
        alt: "Code and Creativity Carnival Programming Contest 2025 winner certificate from City University CSE Department",
      },
    ],
  },
];

export const certificationGalleryImages: StaticImageData[] = [
  contestCard,
  contestentsAll,
  whileContest,
  devopsCertificate,
  returnhexInternshipCertificate,
  icpcCertificate,
  codeClashCertificate,
  codeAndCreativityCarnivalContest,
];
