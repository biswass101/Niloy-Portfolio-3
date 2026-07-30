"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { ArrayEditor, FieldGrid, HeaderRow, RowCard, TextField } from "@/components/admin/AdminDashboardFields";
import { joinCsv, splitCsv } from "@/components/admin/adminUtils";

const AdminExperiencesSection = () => {
  const { content, setContent } = useAdminCms();

  return (
    <section className="space-y-4">
      <HeaderRow
        title="Experience Entries"
        actionLabel="Add experience"
        onAction={() => {
          const newExperience = {
            id: `experience-${Date.now().toString(36)}`,
            title: "Role",
            company: "Company",
            location: "Location",
            period: "2026",
            highlights: ["Impact point"],
            tech: [],
          };

          setContent((prev) => ({
            ...prev,
            experiences: [
              newExperience,
              ...prev.experiences,
            ],
          }));
        }}
      />

      {content.experiences.map((experience, experienceIndex) => (
        <RowCard
          key={`experience-${experienceIndex}`}
          onRemove={() => {
            setContent((prev) => ({
              ...prev,
              experiences: prev.experiences.filter((_, idx) => idx !== experienceIndex),
            }));
          }}
        >
          <FieldGrid>
            <TextField
              label="Role"
              value={experience.title}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  experiences: prev.experiences.map((item, idx) =>
                    idx === experienceIndex ? { ...item, title: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="ID"
              value={experience.id}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  experiences: prev.experiences.map((item, idx) =>
                    idx === experienceIndex ? { ...item, id: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Company"
              value={experience.company}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  experiences: prev.experiences.map((item, idx) =>
                    idx === experienceIndex ? { ...item, company: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Location"
              value={experience.location}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  experiences: prev.experiences.map((item, idx) =>
                    idx === experienceIndex ? { ...item, location: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Period"
              value={experience.period}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  experiences: prev.experiences.map((item, idx) =>
                    idx === experienceIndex ? { ...item, period: value } : item
                  ),
                }));
              }}
            />
          </FieldGrid>

          <ArrayEditor
            title="Highlights"
            items={experience.highlights}
            onChange={(items) => {
              setContent((prev) => ({
                ...prev,
                experiences: prev.experiences.map((item, idx) =>
                  idx === experienceIndex ? { ...item, highlights: items } : item
                ),
              }));
            }}
            addLabel="Add highlight"
          />

          <TextField
            label="Tech Stack (comma separated)"
            value={joinCsv(experience.tech)}
            onChange={(value) => {
              setContent((prev) => ({
                ...prev,
                experiences: prev.experiences.map((item, idx) =>
                  idx === experienceIndex ? { ...item, tech: splitCsv(value) } : item
                ),
              }));
            }}
          />
        </RowCard>
      ))}
    </section>
  );
};

export default AdminExperiencesSection;
