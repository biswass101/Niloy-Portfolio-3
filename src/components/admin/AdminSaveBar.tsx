"use client";

import { getSectionLabel, type SectionKey } from "@/components/admin/AdminSections";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import type { PortfolioContent } from "@/types/cms";

type AdminSaveBarProps = {
  sectionKey: SectionKey;
};

const AdminSaveBar = ({ sectionKey }: AdminSaveBarProps) => {
  const { isSaving, saveContent, content, savedContent } = useAdminCms();
  const { toast } = useToast();

  const getSectionContent = (source: typeof content) => {
    switch (sectionKey) {
      case "skills":
        return source.skillCategories;
      case "overview":
        return null;
      default:
        return (source as Record<string, unknown>)[sectionKey];
    }
  };

  const isDirty =
    sectionKey !== "overview" &&
    JSON.stringify(getSectionContent(content)) !== JSON.stringify(getSectionContent(savedContent));

  const buildSavePayload = (current: PortfolioContent, saved: PortfolioContent) => {
    if (sectionKey === "education") {
      const currentDetails = current.education.details;
      const savedDetails = saved.education.details;
      const hasNewDetails = currentDetails.length > savedDetails.length;

      let nextDetails = currentDetails;
      if (hasNewDetails) {
        const savedSuffix = currentDetails.slice(currentDetails.length - savedDetails.length);
        const isPrepended = savedSuffix.every((detail, index) => detail === savedDetails[index]);
        if (isPrepended) {
          const newDetails = currentDetails.slice(0, currentDetails.length - savedDetails.length);
          nextDetails = [...savedDetails, ...newDetails];
        }
      }

      if (nextDetails === currentDetails) {
        return current;
      }

      return {
        ...current,
        education: {
          ...current.education,
          details: nextDetails,
        },
      };
    }

    if (sectionKey !== "hero") return current;

    const normalize = (value: unknown) => JSON.stringify(value);

    const currentTitles = current.hero.titles;
    const savedTitles = saved.hero.titles;
    const hasNewTitles = currentTitles.length > savedTitles.length;

    let nextTitles = currentTitles;
    if (hasNewTitles) {
      const savedSuffix = currentTitles.slice(currentTitles.length - savedTitles.length);
      const isPrepended = savedSuffix.every((title, index) => title === savedTitles[index]);
      if (isPrepended) {
        const newTitles = currentTitles.slice(0, currentTitles.length - savedTitles.length);
        nextTitles = [...savedTitles, ...newTitles];
      }
    }

    const currentSocials = current.hero.socials;
    const savedSocials = saved.hero.socials;
    const hasNewSocials = currentSocials.length > savedSocials.length;

    let nextSocials = currentSocials;
    if (hasNewSocials) {
      const savedSuffix = currentSocials.slice(currentSocials.length - savedSocials.length);
      const isPrepended = savedSuffix.every(
        (item, index) => normalize(item) === normalize(savedSocials[index])
      );
      if (isPrepended) {
        const newSocials = currentSocials.slice(0, currentSocials.length - savedSocials.length);
        nextSocials = [...savedSocials, ...newSocials];
      }
    }

    if (nextTitles === currentTitles && nextSocials === currentSocials) {
      return current;
    }

    return {
      ...current,
      hero: {
        ...current.hero,
        titles: nextTitles,
        socials: nextSocials,
      },
    };
  };

  const handleSave = async () => {
    const payload = buildSavePayload(content, savedContent);
    const success = await saveContent(payload);
    if (success) {
      toast({
        variant: "success",
        title: "Changes saved",
        description: `Your ${getSectionLabel(sectionKey)} updates are live.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="mt-6 border-t border-border/60 pt-4">
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving || !isDirty}
        className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : `Save ${getSectionLabel(sectionKey)} Changes`}
      </button>
    </div>
  );
};

export default AdminSaveBar;
