"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import {
  FieldGrid,
  SectionTitle,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminDashboardFields";

const AdminAboutSection = () => {
  const { content, setContent, uploadToCms, isUploading } = useAdminCms();

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
          onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, mapImageUrl: value } }))}
          onUploadFile={async (file) => {
            const uploaded = await uploadToCms(file, "portfolio-cms/images");
            if (!uploaded) return;
            setContent((prev) => ({ ...prev, about: { ...prev.about, mapImageUrl: uploaded.url } }));
          }}
          isUploading={isUploading}
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
