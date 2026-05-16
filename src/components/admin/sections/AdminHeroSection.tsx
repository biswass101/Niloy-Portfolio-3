"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import {
  ArrayEditor,
  FieldGrid,
  HeaderRow,
  RowCard,
  SectionTitle,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminDashboardFields";

const AdminHeroSection = () => {
  const {
    content,
    setContent,
    uploadToCms,
    isUploading,
    isDeleting,
    deleteFromCms,
    setStatus,
  } = useAdminCms();

  const handleResumeDelete = async () => {
    if (!content.hero.resumeUrl && !content.hero.resumePublicId) return;

    const publicId = content.hero.resumePublicId?.trim();
    if (publicId) {
      const deleted = await deleteFromCms(publicId, "raw");
      if (!deleted) return;
      setStatus("Resume deleted. Save to persist changes.");
    } else {
      setStatus("Resume link cleared. Save to persist changes.");
    }

    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, resumeUrl: "", resumePublicId: "" },
    }));
  };

  return (
    <section className="space-y-4">
      <SectionTitle title="Hero Content" />
      <FieldGrid>
        <TextField
          label="Greeting"
          value={content.hero.greeting}
          onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, greeting: value } }))}
        />
        <TextField
          label="First Name"
          value={content.hero.firstName}
          onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, firstName: value } }))}
        />
        <TextField
          label="Highlighted Name"
          value={content.hero.highlightedName}
          onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, highlightedName: value } }))}
        />
        <div className="space-y-2">
          <TextField
            label="Resume URL"
            value={content.hero.resumeUrl}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, resumeUrl: value, resumePublicId: "" },
              }))
            }
            onUploadFile={async (file) => {
              const uploaded = await uploadToCms(file, "portfolio-cms/resumes", "raw");
              if (!uploaded) return;
              setContent((prev) => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  resumeUrl: uploaded.url,
                  resumePublicId: uploaded.publicId,
                },
              }));
            }}
            isUploading={isUploading}
            uploadAccept=".pdf,application/pdf"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResumeDelete}
              disabled={isDeleting || (!content.hero.resumeUrl && !content.hero.resumePublicId)}
              className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20 disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete resume"}
            </button>
            <span className="text-xs text-muted-foreground">Uploads PDF to Cloudinary</span>
          </div>
        </div>
        <TextField
          label="Location"
          value={content.hero.location}
          onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, location: value } }))}
        />
      </FieldGrid>

      <TextAreaField
        label="Summary"
        value={content.hero.summary}
        onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, summary: value } }))}
      />

      <ArrayEditor
        title="Animated Titles"
        items={content.hero.titles}
        onChange={(items) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titles: items } }))}
        addLabel="Add title"
      />

      <div className="space-y-2">
        <HeaderRow
          title="Social Links"
          actionLabel="Add link"
          onAction={() => {
            setContent((prev) => ({
              ...prev,
              hero: {
                ...prev.hero,
                socials: [...prev.hero.socials, { label: "Label", href: "https://", iconUrl: "" }],
              },
            }));
          }}
        />

        {content.hero.socials.map((social, index) => (
          <RowCard
            key={`hero-social-${index}`}
            onRemove={() => {
              setContent((prev) => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  socials: prev.hero.socials.filter((_, idx) => idx !== index),
                },
              }));
            }}
          >
            <FieldGrid>
              <TextField
                label="Label"
                value={social.label}
                onChange={(value) => {
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      socials: prev.hero.socials.map((item, idx) =>
                        idx === index ? { ...item, label: value } : item
                      ),
                    },
                  }));
                }}
              />
              <TextField
                label="URL"
                value={social.href}
                onChange={(value) => {
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      socials: prev.hero.socials.map((item, idx) =>
                        idx === index ? { ...item, href: value } : item
                      ),
                    },
                  }));
                }}
              />
              <TextField
                label="Icon URL"
                value={social.iconUrl || ""}
                onChange={(value) => {
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      socials: prev.hero.socials.map((item, idx) =>
                        idx === index ? { ...item, iconUrl: value } : item
                      ),
                    },
                  }));
                }}
                onUploadFile={async (file) => {
                  const uploaded = await uploadToCms(file, "portfolio-cms/icons");
                  if (!uploaded) return;
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      socials: prev.hero.socials.map((item, idx) =>
                        idx === index ? { ...item, iconUrl: uploaded.url } : item
                      ),
                    },
                  }));
                }}
                isUploading={isUploading}
                showPreview
              />
            </FieldGrid>
          </RowCard>
        ))}
      </div>
    </section>
  );
};

export default AdminHeroSection;
