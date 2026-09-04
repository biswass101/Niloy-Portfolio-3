"use client";

import { useState } from "react";
import UniverseBackground from "@/components/UniverseBackground";

type TechNode = {
  iconClass: string;
  label: string;
  longitude: number;
  latitude: number;
};

type ExpertiseCategory = {
  id: string;
  title: string;
  items: {
    label: string;
    iconClass: string;
  }[];
};

const longitudes = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165];

const techNodes: TechNode[] = [
  { iconClass: "devicon-react-original colored", label: "React", longitude: 0, latitude: -45 },
  { iconClass: "devicon-nextjs-original", label: "Next.js", longitude: 0, latitude: 10 },
  { iconClass: "devicon-typescript-plain colored", label: "TypeScript", longitude: 30, latitude: -22 },
  { iconClass: "devicon-javascript-plain colored", label: "JavaScript", longitude: 60, latitude: 40 },
  { iconClass: "devicon-nodejs-plain colored", label: "Node.js", longitude: 90, latitude: -38 },
  { iconClass: "devicon-python-plain colored", label: "Python", longitude: 120, latitude: 6 },
  { iconClass: "devicon-docker-plain colored", label: "Docker", longitude: 150, latitude: -8 },
  { iconClass: "devicon-kubernetes-plain colored", label: "Kubernetes", longitude: 180, latitude: 30 },
  { iconClass: "devicon-postgresql-plain colored", label: "PostgreSQL", longitude: 210, latitude: -30 },
  { iconClass: "devicon-mongodb-plain colored", label: "MongoDB", longitude: 240, latitude: 16 },
  { iconClass: "devicon-redis-plain colored", label: "Redis", longitude: 270, latitude: -48 },
  { iconClass: "devicon-linux-plain colored", label: "Linux", longitude: 300, latitude: 34 },
  { iconClass: "devicon-express-original", label: "Express.js", longitude: 330, latitude: -18 },
  { iconClass: "devicon-nestjs-plain colored", label: "NestJS", longitude: 345, latitude: 42 },
  { iconClass: "devicon-tailwindcss-original colored", label: "Tailwind CSS", longitude: 15, latitude: 48 },
  { iconClass: "devicon-vuejs-plain colored", label: "Vue.js", longitude: 45, latitude: -50 },
  { iconClass: "devicon-nuxtjs-plain colored", label: "Nuxt.js", longitude: 75, latitude: 24 },
  { iconClass: "devicon-graphql-plain colored", label: "GraphQL", longitude: 105, latitude: 46 },
  { iconClass: "devicon-apachekafka-original", label: "Kafka", longitude: 135, latitude: -44 },
  { iconClass: "devicon-cplusplus-plain colored", label: "C++", longitude: 165, latitude: 52 },
  { iconClass: "devicon-java-plain colored", label: "Java", longitude: 195, latitude: -52 },
  { iconClass: "devicon-amazonwebservices-plain-wordmark colored", label: "AWS", longitude: 225, latitude: 44 },
  { iconClass: "devicon-googlecloud-plain colored", label: "Google Cloud", longitude: 255, latitude: -20 },
  { iconClass: "devicon-terraform-plain colored", label: "Terraform", longitude: 240, latitude: 12 },
  { iconClass: "devicon-ansible-plain colored", label: "Ansible", longitude: 285, latitude: 52 },
  { iconClass: "devicon-git-plain colored", label: "Git", longitude: 315, latitude: -6 },
];

const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { label: "C/C++", iconClass: "devicon-cplusplus-plain colored" },
      { label: "Java", iconClass: "devicon-java-plain colored" },
      { label: "Python", iconClass: "devicon-python-plain colored" },
      { label: "JavaScript", iconClass: "devicon-javascript-plain colored" },
      { label: "TypeScript", iconClass: "devicon-typescript-plain colored" },
      { label: "SQL", iconClass: "devicon-postgresql-plain colored" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { label: "React.js", iconClass: "devicon-react-original colored" },
      { label: "Next.js", iconClass: "devicon-nextjs-original" },
      { label: "Nuxt.js (Vue.js)", iconClass: "devicon-nuxtjs-plain colored" },
      { label: "Tailwind CSS", iconClass: "devicon-tailwindcss-original colored" },
      { label: "HTML5", iconClass: "devicon-html5-plain colored" },
      { label: "CSS3", iconClass: "devicon-css3-plain colored" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { label: "Node.js", iconClass: "devicon-nodejs-plain colored" },
      { label: "Express.js", iconClass: "devicon-express-original" },
      { label: "NestJS", iconClass: "devicon-nestjs-plain colored" },
      { label: "GraphQL", iconClass: "devicon-graphql-plain colored" },
      { label: "REST APIs", iconClass: "devicon-nodejs-plain colored" },
      { label: "JWT Authentication", iconClass: "devicon-nodejs-plain colored" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Messaging",
    items: [
      { label: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
      { label: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
      { label: "Redis", iconClass: "devicon-redis-plain colored" },
      { label: "Prisma ORM", iconClass: "devicon-prisma-original" },
      { label: "Kafka", iconClass: "devicon-apachekafka-original" },
      { label: "BullMQ", iconClass: "devicon-redis-plain colored" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    items: [
      { label: "AWS (EC2, S3, RDS, IAM, VPC, Bedrock)", iconClass: "devicon-amazonwebservices-plain-wordmark colored" },
      { label: "Google Cloud", iconClass: "devicon-googlecloud-plain colored" },
      { label: "Docker", iconClass: "devicon-docker-plain colored" },
      { label: "Kubernetes", iconClass: "devicon-kubernetes-plain colored" },
      { label: "CI/CD", iconClass: "devicon-githubactions-plain colored" },
      { label: "Terraform", iconClass: "devicon-terraform-plain colored" },
      { label: "Ansible", iconClass: "devicon-ansible-plain colored" },
      { label: "Linux", iconClass: "devicon-linux-plain colored" },
      { label: "Git", iconClass: "devicon-git-plain colored" },
      { label: "PM2", iconClass: "devicon-nodejs-plain colored" },
    ],
  },
  {
    id: "ai",
    title: "AI & Tools",
    items: [
      { label: "OpenAI API", iconClass: "devicon-python-plain colored" },
      { label: "Amazon Bedrock", iconClass: "devicon-amazonwebservices-plain-wordmark colored" },
      { label: "LangChain", iconClass: "devicon-python-plain colored" },
      { label: "RAG (Vector Databases)", iconClass: "devicon-postgresql-plain colored" },
      { label: "Prompt Engineering", iconClass: "devicon-python-plain colored" },
      { label: "Meta Webhooks & Graph API", iconClass: "devicon-facebook-plain colored" },
    ],
  },
];

const TechnicalExpertisePage = () => {
  const [activeTab, setActiveTab] = useState(expertiseCategories[0].id);
  const selectedCategory = expertiseCategories.find((category) => category.id === activeTab) ?? expertiseCategories[0];

  return (
    <main className="relative min-h-screen bg-background section-padding pt-32">
      <UniverseBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        <section className="px-1 md:px-0">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-primary">Tech Atlas</p>
          <h1 className="font-mono text-3xl font-bold md:text-4xl">Technical Expertise</h1>
        </section>

        <section className="mt-8">
          <div className="tech-globe-scene mx-auto h-[360px] sm:h-[430px] md:h-[520px] lg:h-[620px] w-full max-w-[1200px]">
            <div className="tech-globe-sphere">
              <div className="tech-globe-core" />
              <div className="tech-globe-atmosphere" />

              {longitudes.map((degree) => (
                <span
                  key={degree}
                  className="tech-globe-longitude"
                  style={{ transform: `rotateY(${degree}deg)` }}
                  aria-hidden="true"
                />
              ))}

              {techNodes.map((node) => (
                <span
                  key={node.label}
                  className="tech-stack-node"
                  style={{ transform: `rotateY(${node.longitude}deg) rotateX(${node.latitude}deg) translateZ(var(--node-depth))` }}
                >
                  <span className="tech-stack-badge" title={node.label}>
                    <i className={node.iconClass} aria-hidden="true" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-1 sm:mt-3 md:mt-8 lg:mt-12">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">Tech Categories</p>
          <div className="glass rounded-xl p-4 md:p-6">
            <div className="mb-5 flex flex-wrap gap-2">
              {expertiseCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveTab(category.id)}
                  className={`rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-300 ${
                    activeTab === category.id
                      ? "border-primary/50 bg-primary/18 text-primary shadow-[0_0_18px_hsl(var(--primary)/0.24)]"
                      : "border-border/70 bg-card/30 text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <article className="rounded-lg border border-border/55 bg-card/25 p-4 md:p-5">
              <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.16em] text-primary">
                {selectedCategory.title}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedCategory.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-md border border-primary/20 bg-primary/8 px-3 py-2 text-sm text-foreground/90"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/35 bg-card/90">
                      <i className={`${item.iconClass} text-base`} aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TechnicalExpertisePage;
