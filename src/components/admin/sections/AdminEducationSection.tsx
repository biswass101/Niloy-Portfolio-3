"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import {
  ArrayEditor,
  FieldGrid,
  SectionTitle,
  TextField,
} from "@/components/admin/AdminDashboardFields";

const AdminEducationSection = () => {
  const { content, setContent, uploadToCms, isUploading } = useAdminCms();

  return (
    <section className="space-y-4">
      <SectionTitle title="Education Content" />
      <FieldGrid>
        <TextField
          label="Title"
          value={content.education.title}
          onChange={(value) => setContent((prev) => ({ ...prev, education: { ...prev.education, title: value } }))}
        />
        <TextField
          label="Organization"
          value={content.education.organization}
          onChange={(value) =>
            setContent((prev) => ({ ...prev, education: { ...prev.education, organization: value } }))
          }
        />
        <TextField
          label="Period"
          value={content.education.period}
          onChange={(value) => setContent((prev) => ({ ...prev, education: { ...prev.education, period: value } }))}
        />
        <TextField
          label="Background Image URL"
          value={content.education.backgroundImageUrl || ""}
          onChange={(value) =>
            setContent((prev) => ({ ...prev, education: { ...prev.education, backgroundImageUrl: value } }))
          }
          onUploadFile={async (file) => {
            const uploaded = await uploadToCms(file, "portfolio-cms/images");
            if (!uploaded) return;
            setContent((prev) => ({
              ...prev,
              education: { ...prev.education, backgroundImageUrl: uploaded.url },
            }));
          }}
          isUploading={isUploading}
          showPreview
        />
      </FieldGrid>

      <ArrayEditor
        title="Education Details"
        items={content.education.details}
        onChange={(items) => setContent((prev) => ({ ...prev, education: { ...prev.education, details: items } }))}
        addLabel="Add detail"
      />
    </section>
  );
};

export default AdminEducationSection;
