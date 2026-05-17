"use client";

import { useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import {
  FieldGrid,
  SectionTitle,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminDashboardFields";

const AdminAboutSection = () => {
  const { content, setContent, uploadToCms, deleteFromCms, saveContent, setStatus, isUploading } = useAdminCms();
  const { toast } = useToast();
  const [isMapRemoving, setIsMapRemoving] = useState(false);

  const handleMapRemove = async () => {
    if (!content.about.mapImageUrl) return;

    setIsMapRemoving(true);
    try {
      if (content.about.mapImagePublicId) {
        const deleted = await deleteFromCms(content.about.mapImagePublicId, "image");
        if (!deleted) {
          toast({
            variant: "destructive",
            title: "Map image delete failed",
            description: "Please try again.",
          });
          return;
        }
      }

      const nextContent = {
        ...content,
        about: {
          ...content.about,
          mapImageUrl: "",
          mapImagePublicId: "",
        },
      };

      setContent(nextContent);
      const saved = await saveContent(nextContent);
      if (!saved) {
        toast({
          variant: "destructive",
          title: "Save failed",
          description: "Please try again.",
        });
        return;
      }

      setStatus("Map image removed and saved.");
      toast({
        variant: "success",
        title: "Map image removed",
        description: "Changes saved to the database.",
      });
    } finally {
      setIsMapRemoving(false);
    }
  };

  return (
    <section className="space-y-4">
      <SectionTitle title="About Content" />
      <FieldGrid>
        <TextField
          label="Location Title"
          value={content.about.locationTitle}
          onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, locationTitle: value } }))}
        />
        <TextField
          label="Coordinates"
          value={content.about.coordinates}
          onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, coordinates: value } }))}
        />
        <TextField
          label="Timezone"
          value={content.about.timezone}
          onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, timezone: value } }))}
        />
        <TextField
          label="Map Image URL"
          value={content.about.mapImageUrl || ""}
          onChange={(value) =>
            setContent((prev) => ({
              ...prev,
              about: {
                ...prev.about,
                mapImageUrl: value,
                mapImagePublicId: value === prev.about.mapImageUrl ? prev.about.mapImagePublicId : "",
              },
            }))
          }
          onUploadFile={async (file) => {
            const uploaded = await uploadToCms(file, "portfolio-cms/images");
            if (!uploaded) return;
            setContent((prev) => ({
              ...prev,
              about: {
                ...prev.about,
                mapImageUrl: uploaded.url,
                mapImagePublicId: uploaded.publicId,
              },
            }));
          }}
          isUploading={isUploading}
          uploadAction={
            <button
              type="button"
              onClick={handleMapRemove}
              disabled={!content.about.mapImageUrl || isMapRemoving}
              className="inline-flex items-center rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-red-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isMapRemoving ? "Removing..." : "Remove"}
            </button>
          }
          showPreview
        />
      </FieldGrid>

      <TextAreaField
        label="Brief"
        value={content.about.brief}
        onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, brief: value } }))}
      />
      <TextAreaField
        label="Quote"
        value={content.about.quote}
        onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, quote: value } }))}
      />
      <TextAreaField
        label="Growth"
        value={content.about.growth}
        onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, growth: value } }))}
      />
      <TextAreaField
        label="Focus"
        value={content.about.focus}
        onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, focus: value } }))}
      />
      <TextAreaField
        label="Craft"
        value={content.about.craft}
        onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, craft: value } }))}
      />
    </section>
  );
};

export default AdminAboutSection;
