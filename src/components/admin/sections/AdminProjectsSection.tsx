"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { HeaderRow, RowCard, TextAreaField, TextField, FieldGrid } from "@/components/admin/AdminDashboardFields";
import { joinCsv, splitCsv, toId } from "@/components/admin/adminUtils";

const AdminProjectsSection = () => {
  const { content, setContent, uploadToCms, isUploading, lastUploadUrl } = useAdminCms();

  return (
    <section className="space-y-4">
      <HeaderRow
        title="Projects"
        actionLabel="Add project"
        onAction={() => {
          setContent((prev) => ({
            ...prev,
            projects: [
              ...prev.projects,
              {
                id: `project-${Date.now().toString(36)}`,
                title: "New Project",
                description: "Project summary",
                tech: [],
                year: String(new Date().getFullYear()),
                featured: true,
                images: [{ src: lastUploadUrl || "", alt: "Project image" }],
              },
            ],
          }));
        }}
      />

      {content.projects.map((project, projectIndex) => (
        <RowCard
          key={`project-${projectIndex}`}
          onRemove={() => {
            setContent((prev) => ({
              ...prev,
              projects: prev.projects.filter((_, idx) => idx !== projectIndex),
            }));
          }}
        >
          <FieldGrid>
            <TextField
              label="Project Title"
              value={project.title}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex
                      ? {
                          ...item,
                          title: value,
                          id: item.id || toId(value),
                        }
                      : item
                  ),
                }));
              }}
            />
            <TextField
              label="Project ID"
              value={project.id}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex ? { ...item, id: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Year"
              value={project.year}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex ? { ...item, year: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="Live URL"
              value={project.live || ""}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex ? { ...item, live: value } : item
                  ),
                }));
              }}
            />
            <TextField
              label="GitHub URL"
              value={project.github || ""}
              onChange={(value) => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex ? { ...item, github: value } : item
                  ),
                }));
              }}
            />
            <label className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Featured</span>
              <select
                value={project.featured === false ? "no" : "yes"}
                onChange={(event) => {
                  setContent((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, idx) =>
                      idx === projectIndex ? { ...item, featured: event.target.value === "yes" } : item
                    ),
                  }));
                }}
                className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </FieldGrid>

          <TextAreaField
            label="Description"
            value={project.description}
            onChange={(value) => {
              setContent((prev) => ({
                ...prev,
                projects: prev.projects.map((item, idx) =>
                  idx === projectIndex ? { ...item, description: value } : item
                ),
              }));
            }}
          />

          <TextField
            label="Tech Stack (comma separated)"
            value={joinCsv(project.tech)}
            onChange={(value) => {
              setContent((prev) => ({
                ...prev,
                projects: prev.projects.map((item, idx) =>
                  idx === projectIndex ? { ...item, tech: splitCsv(value) } : item
                ),
              }));
            }}
          />

          <div className="space-y-2">
            <HeaderRow
              title="Images"
              actionLabel="Add image"
              onAction={() => {
                setContent((prev) => ({
                  ...prev,
                  projects: prev.projects.map((item, idx) =>
                    idx === projectIndex
                      ? {
                          ...item,
                          images: [...item.images, { src: lastUploadUrl || "", alt: "Project image" }],
                        }
                      : item
                  ),
                }));
              }}
            />

            {project.images.map((image, imageIndex) => (
              <RowCard
                key={`project-image-${projectIndex}-${imageIndex}`}
                onRemove={() => {
                  setContent((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, idx) =>
                      idx === projectIndex
                        ? {
                            ...item,
                            images: item.images.filter((_, idx2) => idx2 !== imageIndex),
                          }
                        : item
                    ),
                  }));
                }}
              >
                <FieldGrid>
                  <TextField
                    label="Image URL"
                    value={image.src}
                    onChange={(value) => {
                      setContent((prev) => ({
                        ...prev,
                        projects: prev.projects.map((item, idx) =>
                          idx === projectIndex
                            ? {
                                ...item,
                                images: item.images.map((img, idx2) =>
                                  idx2 === imageIndex ? { ...img, src: value } : img
                                ),
                              }
                            : item
                        ),
                      }));
                    }}
                    onUploadFile={async (file) => {
                      const uploaded = await uploadToCms(file, "portfolio-cms/projects");
                      if (!uploaded) return;
                      setContent((prev) => ({
                        ...prev,
                        projects: prev.projects.map((item, idx) =>
                          idx === projectIndex
                            ? {
                                ...item,
                                images: item.images.map((img, idx2) =>
                                  idx2 === imageIndex ? { ...img, src: uploaded.url } : img
                                ),
                              }
                            : item
                        ),
                      }));
                    }}
                    isUploading={isUploading}
                    showPreview
                  />
                  <TextField
                    label="Alt Text"
                    value={image.alt}
                    onChange={(value) => {
                      setContent((prev) => ({
                        ...prev,
                        projects: prev.projects.map((item, idx) =>
                          idx === projectIndex
                            ? {
                                ...item,
                                images: item.images.map((img, idx2) =>
                                  idx2 === imageIndex ? { ...img, alt: value } : img
                                ),
                              }
                            : item
                        ),
                      }));
                    }}
                  />
                </FieldGrid>
              </RowCard>
            ))}
          </div>
        </RowCard>
      ))}
    </section>
  );
};

export default AdminProjectsSection;
