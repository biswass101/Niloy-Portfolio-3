export type CertificationItemType = "award" | "certification";

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  period: string;
  type: CertificationItemType;
  status: "completed" | "in_progress";
  details: string;
  credentialUrl?: string;
};

export const certifications: CertificationItem[] = [
  {
    id: "icpc-asia-dhaka-2025",
    title: "ICPC Asia Dhaka Regional Onsite Contest",
    issuer: "ICPC Asia Dhaka Regional",
    period: "2025",
    type: "award",
    status: "completed",
    details:
      "Selected and participated in the onsite regional contest, practicing team strategy, algorithm design, and high-pressure debugging.",
  },
  {
    id: "code-clash-2025-winner",
    title: "Winner, Intra-Department Code Clash Programming Contest",
    issuer: "City University, CSE Department",
    period: "2025",
    type: "award",
    status: "completed",
    details:
      "Achieved first position by solving complex competitive programming challenges with strong time and memory optimization.",
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
  },
  {
    id: "ostad-mastering-devops",
    title: "Mastering DevOps Course",
    issuer: "Ostad",
    period: "In Progress",
    type: "certification",
    status: "in_progress",
    details:
      "Currently building skills in CI/CD pipelines, containerization, deployment automation, and operational best practices.",
  },
];
