"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { FieldGrid, HeaderRow, RowCard, TextField } from "@/components/admin/AdminDashboardFields";
import { joinCsv, splitCsv } from "@/components/admin/adminUtils";

const AdminSkillsSection = () => {
  const { content, setContent } = useAdminCms();

  return (
    <section className="space-y-4">
      <HeaderRow
        title="Skill Categories"
        actionLabel="Add category"
        onAction={() => {
          setContent((prev) => ({
            ...prev,
            skillCategories: [
              ...prev.skillCategories,
              { id: `category-${Date.now().toString(36)}`, title: "Category", skills: [] },
            ],
          }));
        }}
      />

      {content.skillCategories.map((category, categoryIndex) => (
        <RowCard
          key={`skill-category-${categoryIndex}`}
          onRemove={() => {
            setContent((prev) => ({
              ...prev,
              skillCategories: prev.skillCategories.filter((_, idx) => idx !== categoryIndex),
            }));
          }}
        >
          <FieldGrid>
            <TextField
              label="Category Title"
              value={category.title}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  skillCategories: prev.skillCategories.map((item, idx) =>
                    idx === categoryIndex ? { ...item, title: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Category ID"
              value={category.id}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  skillCategories: prev.skillCategories.map((item, idx) =>
                    idx === categoryIndex ? { ...item, id: value } : item
                  ),
                }));
              }}
            />
          </FieldGrid>

          <TextField
            label="Skills (comma separated)"
            value={joinCsv(category.skills)}
            onChange={(value) => {
              setContent((prev) => ({
                ...prev,
                skillCategories: prev.skillCategories.map((item, idx) =>
                  idx === categoryIndex ? { ...item, skills: splitCsv(value) } : item
                ),
              }));
            }}
          />
        </RowCard>
      ))}
    </section>
  );
};

export default AdminSkillsSection;
