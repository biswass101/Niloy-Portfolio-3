"use client";

import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import UniverseBackground from "@/components/UniverseBackground";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

const HomePage = () => {
  const { content } = usePortfolioContent();

  return (
    <div className="relative min-h-screen bg-background">
      <UniverseBackground />
      <div className="relative z-10">
        <HeroSection hero={content.hero} />
        <ProjectsSection projects={content.projects} />
        <AboutSection about={content.about} />
        <ExperienceSection experiences={content.experiences} />
        <SkillsSection skillCategories={content.skillCategories} />
        <EducationSection education={content.education} certifications={content.certifications} />
        <ContactSection contact={content.contact} />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default HomePage;
