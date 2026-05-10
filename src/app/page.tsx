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

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <UniverseBackground />
      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default HomePage;
