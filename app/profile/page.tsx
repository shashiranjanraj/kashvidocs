import type { Metadata } from "next";
import { ProfileShell } from "./_components/ProfileShell";
import { HeroSection } from "./_components/HeroSection";
import { AboutSection } from "./_components/AboutSection";
import { SkillsSection } from "./_components/SkillsSection";
import { KashviHighlight } from "./_components/KashviHighlight";
import { ProjectsSection } from "./_components/ProjectsSection";
import { ExperienceSection } from "./_components/ExperienceSection";
import { BuildingNowSection } from "./_components/BuildingNowSection";
import { BlogSection } from "./_components/BlogSection";
import { ContactSection } from "./_components/ContactSection";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Shashi Ranjan — Senior Software Engineer (Backend / Full Stack), Delhi. Golang, Node.js, PHP. Creator of Kashvi framework.",
  openGraph: {
    title: "Shashi Ranjan — Senior Backend Engineer",
    description: "Go, microservices, Kashvi framework, distributed systems. Delhi, India.",
  },
};

export default function ProfilePage() {
  return (
    <ProfileShell>
      <HeroSection />
      <KashviHighlight />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BuildingNowSection />
      <BlogSection />
      <ContactSection />
    </ProfileShell>
  );
}
