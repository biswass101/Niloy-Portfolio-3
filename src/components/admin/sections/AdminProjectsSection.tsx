"use client";

import { useRef, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import { HeaderRow, SectionTitle, TextAreaField, TextField, FieldGrid } from "@/components/admin/AdminDashboardFields";
import { joinCsv, splitCsv, toId } from "@/components/admin/adminUtils";
import type { PortfolioProject } from "@/types/cms";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProjectEditorMode = "add" | "edit";

const createDefaultProject = (lastUploadUrl: string): PortfolioProject => ({
  id: `project-${Date.now().toString(36)}`,
  title: "New Project",
  description: "Project summary",
  tech: [],
  year: String(new Date().getFullYear()),
  featured: true,
  live: "",
  github: "",
  images: [{ src: lastUploadUrl || "", alt: "Project image" }],
});

const normalizeProjectDraft = (draftProject: PortfolioProject): PortfolioProject => ({
  ...draftProject,
  id: draftProject.id.trim() || toId(draftProject.title || `project-${Date.now().toString(36)}`),
  title: draftProject.title.trim() || "Untitled Project",
  year: draftProject.year.trim() || String(new Date().getFullYear()),
  description: draftProject.description.trim(),
  tech: draftProject.tech.filter((item) => item.trim().length > 0),
  images: draftProject.images.length > 0 ? draftProject.images : [{ src: "", alt: "Project image" }],
});

const AdminProjectsSection = () => {
  const { content, savedContent, setContent, uploadToCms, isUploading, lastUploadUrl, saveContent, isSaving } =
    useAdminCms();
  const { toast } = useToast();
  const [editorMode, setEditorMode] = useState<ProjectEditorMode>("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftProject, setDraftProject] = useState<PortfolioProject | null>(null);
  const [techInput, setTechInput] = useState("");
  const confirmActionRef = useRef<(() => Promise<void>) | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");

  const requestConfirm = (title: string, description: string, action: () => Promise<void>) => {
    confirmActionRef.current = action;
    setConfirmTitle(title);
    setConfirmDescription(description);
    setConfirmOpen(true);
  };

  const openAddEditor = () => {
    const nextDraft = createDefaultProject(lastUploadUrl);
    setEditorMode("add");
    setEditingIndex(null);
    setDraftProject(nextDraft);
    setTechInput(joinCsv(nextDraft.tech));
  };

  const openEditEditor = (index: number) => {
    const nextDraft = JSON.parse(JSON.stringify(content.projects[index])) as PortfolioProject;
    setEditorMode("edit");
    setEditingIndex(index);
    setDraftProject(nextDraft);
    setTechInput(joinCsv(nextDraft.tech));
  };

  const updateDraft = <K extends keyof PortfolioProject>(key: K, value: PortfolioProject[K]) => {
    setDraftProject((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const getPrependedCount = <T,>(current: T[], saved: T[], isEqual: (left: T, right: T) => boolean) => {
    if (current.length <= saved.length) return 0;
    const savedSuffix = current.slice(current.length - saved.length);
    const isPrepended = savedSuffix.every((item, index) => isEqual(item, saved[index]));
    return isPrepended ? current.length - saved.length : 0;
  };

  const savedProject = editorMode === "edit" && editingIndex !== null ? savedContent.projects[editingIndex] : undefined;
  const savedImages = savedProject?.images || [];

  const draftInfo = draftProject
    ? {
        title: draftProject.title,
        id: draftProject.id,
        year: draftProject.year,
        live: draftProject.live || "",
        github: draftProject.github || "",
        featured: draftProject.featured !== false,
        description: draftProject.description,
        tech: draftProject.tech,
      }
    : null;
  const savedInfo = savedProject
    ? {
        title: savedProject.title,
        id: savedProject.id,
        year: savedProject.year,
        live: savedProject.live || "",
        github: savedProject.github || "",
        featured: savedProject.featured !== false,
        description: savedProject.description,
        tech: savedProject.tech,
      }
    : null;
  const isProjectInfoDirty =
    editorMode === "edit" && draftInfo && savedInfo ? JSON.stringify(draftInfo) !== JSON.stringify(savedInfo) : false;

  const newImageCount =
    draftProject && editorMode === "edit"
      ? getPrependedCount(
          draftProject.images,
          savedImages,
          (left, right) => JSON.stringify(left) === JSON.stringify(right)
        )
      : 0;

  const getSavedImageAt = (index: number) => {
    if (newImageCount > 0) {
      return index >= newImageCount ? savedImages[index - newImageCount] : undefined;
    }
    return savedImages[index];
  };

  const handleProjectInfoSave = async () => {
    if (!draftProject || editorMode !== "edit" || editingIndex === null) return;

    const normalizedProject = normalizeProjectDraft(draftProject);
    const nextProjects = content.projects.map((item, idx) =>
      idx === editingIndex ? { ...normalizedProject, images: savedImages } : item
    );
    const nextContent = {
      ...content,
      projects: nextProjects,
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

    toast({
      variant: "success",
      title: "Project info saved",
      description: "Core project fields are updated.",
    });
  };

  const handleImageSave = async (imageIndex: number) => {
    if (!draftProject || editorMode !== "edit" || editingIndex === null) return;

    const nextImages = [...draftProject.images];
    if (imageIndex < newImageCount) {
      const [moved] = nextImages.splice(imageIndex, 1);
      nextImages.push(moved);
    }

    const normalizedProject = normalizeProjectDraft({ ...draftProject, images: nextImages });
    const nextProjects = content.projects.map((item, idx) => (idx === editingIndex ? normalizedProject : item));
    const nextContent = {
      ...content,
      projects: nextProjects,
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

    setDraftProject((prev) => (prev ? { ...prev, images: nextImages } : prev));
    toast({
      variant: "success",
      title: "Image saved",
      description: "Project image is updated.",
    });
  };

  const handleProjectSave = async () => {
    if (!draftProject) return;

    const normalizedProject = normalizeProjectDraft(draftProject);

    const nextProjects =
      editorMode === "add"
        ? [normalizedProject, ...content.projects]
        : content.projects.map((item, idx) => (idx === editingIndex ? normalizedProject : item));

    const nextContent = {
      ...content,
      projects: nextProjects,
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

    toast({
      variant: "success",
      title: editorMode === "add" ? "Project added" : "Project updated",
      description: "Changes saved to the database.",
    });
    setDraftProject(null);
    setTechInput("");
    setEditingIndex(null);
  };

  const handleProjectRemove = async (index: number) => {
    requestConfirm("Delete project?", "This will remove the project permanently from the database.", async () => {
      const nextContent = {
        ...content,
        projects: content.projects.filter((_, idx) => idx !== index),
      };

      setContent(nextContent);
      const saved = await saveContent(nextContent);
      if (!saved) {
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: "Please try again.",
        });
        return;
      }

      toast({
        variant: "success",
        title: "Project deleted",
        description: "Changes saved to the database.",
      });
    });
  };

  return (
    <section className="space-y-4">
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isSaving}
              onClick={async () => {
                setConfirmOpen(false);
                const action = confirmActionRef.current;
                confirmActionRef.current = null;
                if (action) {
                  await action();
                }
              }}
            >
              {isSaving ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {draftProject ? (
        <div className="space-y-4 rounded-xl border border-border/60 bg-background/30 p-4 md:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1">
              <SectionTitle title={editorMode === "add" ? "Add Project" : "Edit Project"} />
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Full editor view for project content and gallery
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDraftProject(null);
                setTechInput("");
                setEditingIndex(null);
              }}
              className="rounded-md border border-border/70 bg-card/30 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
            >
              Back
            </button>
          </div>

          <FieldGrid>
            <TextField
              label="Project Title"
              value={draftProject.title}
              onChange={(value) => {
                setDraftProject((prev) =>
                  prev
                    ? {
                        ...prev,
                        title: value,
                        id: prev.id || toId(value),
                      }
                    : prev
                );
              }}
            />
            <TextField label="Project ID" value={draftProject.id} onChange={(value) => updateDraft("id", value)} />
            <TextField label="Year" value={draftProject.year} onChange={(value) => updateDraft("year", value)} />
            <TextField label="Live URL" value={draftProject.live || ""} onChange={(value) => updateDraft("live", value)} />
            <TextField
              label="GitHub URL"
              value={draftProject.github || ""}
              onChange={(value) => updateDraft("github", value)}
            />
            <label className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Featured</span>
              <select
                value={draftProject.featured === false ? "no" : "yes"}
                onChange={(event) => updateDraft("featured", event.target.value === "yes")}
                className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </FieldGrid>

          <TextAreaField
            label="Description"
            value={draftProject.description}
            onChange={(value) => updateDraft("description", value)}
          />

          <TextField
            label="Tech Stack (comma separated)"
            value={techInput}
            onChange={(value) => {
              setTechInput(value);
              updateDraft("tech", splitCsv(value));
            }}
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <SectionTitle title="Project Details" />
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Core information shown on the project card and preview
              </p>
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => void (editorMode === "add" ? handleProjectSave() : handleProjectInfoSave())}
                disabled={
                  isSaving || (editorMode === "edit" ? !isProjectInfoDirty : !draftProject)
                }
                className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
              >
                {isSaving
                  ? "Saving..."
                  : editorMode === "add"
                    ? "Add Project"
                    : "Save Project Info"}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <HeaderRow
              title="Project Images"
              actionLabel="Add image"
              onAction={() =>
                setDraftProject((prev) =>
                  prev
                    ? {
                        ...prev,
                        images: [{ src: "", alt: "Project image" }, ...prev.images],
                      }
                    : prev
                )
              }
            />

            {draftProject.images.map((image, imageIndex) => (
              <div
                key={`project-image-editor-${imageIndex}`}
                className="space-y-3 rounded-xl border border-border/60 bg-background/40 p-3"
              >
                <div className="flex justify-end gap-2">
                  {editorMode === "edit" ? (() => {
                    const savedImage = getSavedImageAt(imageIndex);
                    const isDirty = JSON.stringify(image) !== JSON.stringify(savedImage);
                    if (!isDirty) return null;
                    return (
                      <button
                        type="button"
                        onClick={() => void handleImageSave(imageIndex)}
                        disabled={isSaving}
                        className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                    );
                  })() : null}
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode === "edit") {
                        requestConfirm(
                          "Delete project image?",
                          "This will remove the image permanently from the database.",
                          async () => {
                            const nextImages = draftProject.images.filter((_, idx) => idx !== imageIndex);
                            const normalizedProject = normalizeProjectDraft({ ...draftProject, images: nextImages });
                            const nextProjects = content.projects.map((item, idx) =>
                              idx === editingIndex ? normalizedProject : item
                            );
                            const nextContent = {
                              ...content,
                              projects: nextProjects,
                            };
                            setContent(nextContent);
                            const saved = await saveContent(nextContent);
                            if (!saved) {
                              toast({
                                variant: "destructive",
                                title: "Delete failed",
                                description: "Please try again.",
                              });
                              return;
                            }
                            setDraftProject((prev) =>
                              prev
                                ? { ...prev, images: prev.images.filter((_, idx) => idx !== imageIndex) }
                                : prev
                            );
                            toast({
                              variant: "success",
                              title: "Image deleted",
                              description: "Changes saved to the database.",
                            });
                          }
                        );
                        return;
                      }
                      setDraftProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: prev.images.filter((_, idx) => idx !== imageIndex),
                            }
                          : prev
                      );
                    }}
                    className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20"
                  >
                    Remove image
                  </button>
                </div>
                <FieldGrid>
                  <TextField
                    label="Image URL"
                    value={image.src}
                    onChange={(value) => {
                      setDraftProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: prev.images.map((img, idx) => (idx === imageIndex ? { ...img, src: value } : img)),
                            }
                          : prev
                      );
                    }}
                    onUploadFile={async (file) => {
                      const uploaded = await uploadToCms(file, "portfolio-cms/projects");
                      if (!uploaded) return;
                      setDraftProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: prev.images.map((img, idx) =>
                                idx === imageIndex ? { ...img, src: uploaded.url } : img
                              ),
                            }
                          : prev
                      );
                    }}
                    isUploading={isUploading}
                    showPreview
                  />
                  <TextField
                    label="Alt Text"
                    value={image.alt}
                    onChange={(value) =>
                      setDraftProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: prev.images.map((img, idx) => (idx === imageIndex ? { ...img, alt: value } : img)),
                            }
                          : prev
                      )
                    }
                  />
                </FieldGrid>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDraftProject(null);
                setTechInput("");
                setEditingIndex(null);
              }}
              className="rounded-md border border-border/70 bg-card/30 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {!draftProject ? (
        <>
          <div className="space-y-1">
            <SectionTitle title="Projects" />
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Manage projects with quick edit and remove actions
            </p>
          </div>

          <HeaderRow
            title="Projects"
            actionLabel="Add project"
            onAction={openAddEditor}
          />

          {content.projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-background/20 p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">No projects yet</p>
              <button
                type="button"
                onClick={openAddEditor}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Project
              </button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {content.projects.map((project, projectIndex) => (
                <article
                  key={project.id || `project-${projectIndex}`}
                  className="space-y-3 rounded-xl border border-border/60 bg-background/40 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-1 font-mono text-sm uppercase tracking-[0.14em] text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">{project.year}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditEditor(projectIndex)}
                        className="rounded-md border border-primary/40 bg-primary/10 p-1.5 text-primary hover:bg-primary/20"
                        aria-label={`Edit ${project.title}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleProjectRemove(projectIndex)}
                        className="rounded-md border border-red-500/40 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
                        aria-label={`Remove ${project.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {project.images[0]?.src ? (
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt || `${project.title} image`}
                      className="h-32 w-full rounded-md border border-border/60 bg-card/30 object-cover"
                    />
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-border/60 bg-card/20">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        No Image
                      </p>
                    </div>
                  )}

                  <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((item) => (
                      <span
                        key={`${project.id}-${item}`}
                        className="rounded-md border border-border/60 bg-card/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : null}
    </section>
  );
};

export default AdminProjectsSection;
