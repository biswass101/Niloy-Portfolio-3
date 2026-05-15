"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PortfolioContent } from "@/types/cms";

type AdminDashboardProps = {
  initialContent: PortfolioContent;
  adminEmail: string;
};

type SectionKey =
  | "overview"
  | "hero"
  | "about"
  | "education"
  | "contact"
  | "projects"
  | "experiences"
  | "skills"
  | "certifications";

const sections: { key: SectionKey; label: string; help: string }[] = [
  { key: "overview", label: "Dashboard", help: "Analytics and quick health check" },
  { key: "hero", label: "Hero", help: "Homepage headline and social links" },
  { key: "about", label: "About", help: "Personal profile and map section" },
  { key: "education", label: "Education", help: "Degree and university details" },
  { key: "contact", label: "Contact", help: "Workflow and contact methods" },
  { key: "projects", label: "Projects", help: "Project cards with image gallery" },
  { key: "experiences", label: "Experiences", help: "Career timeline entries" },
  { key: "skills", label: "Skills", help: "Skill categories and tech tags" },
  { key: "certifications", label: "Certifications", help: "Awards and certificates" },
];

const getSectionLabel = (section: SectionKey) => sections.find((item) => item.key === section)?.label || "Section";

const cloneContent = (value: PortfolioContent) => JSON.parse(JSON.stringify(value)) as PortfolioContent;

const toId = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `item-${Date.now().toString(36)}`;

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinCsv = (items: string[]) => items.join(", ");

const AdminDashboard = ({ initialContent, adminEmail }: AdminDashboardProps) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [content, setContent] = useState<PortfolioContent>(() => cloneContent(initialContent));
  const [status, setStatus] = useState("Visual CMS ready. Update any section and save from that section.");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [lastUploadUrl, setLastUploadUrl] = useState("");

  const metrics = useMemo(() => {
    const featured = content.projects.filter((project) => project.featured !== false).length;
    return {
      projects: content.projects.length,
      featured,
      experiences: content.experiences.length,
      skills: content.skillCategories.reduce((acc, category) => acc + category.skills.length, 0),
      certifications: content.certifications.length,
      socialLinks: content.hero.socials.length,
    };
  }, [content]);

  const sectionDensityData = useMemo(
    () => [
      { name: "Projects", value: content.projects.length },
      { name: "Experiences", value: content.experiences.length },
      { name: "Skills", value: content.skillCategories.reduce((acc, category) => acc + category.skills.length, 0) },
      { name: "Certs", value: content.certifications.length },
      { name: "Workflow", value: content.contact.workflowSteps.length },
    ],
    [content]
  );

  const projectSplitData = useMemo(
    () => [
      { name: "Featured", value: metrics.featured },
      { name: "Non-featured", value: Math.max(metrics.projects - metrics.featured, 0) },
    ],
    [metrics]
  );

  const handleSave = async () => {
    setIsSaving(true);
    setStatus("Saving portfolio content to MongoDB...");

    const response = await fetch("/api/cms/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || "Save failed.");
      setIsSaving(false);
      return;
    }

    setContent(cloneContent(data.content));
    setStatus("Saved successfully. Public portfolio now uses updated DB data.");
    setIsSaving(false);
    router.refresh();
  };

  const uploadToCms = async (file: File, folder = "portfolio-cms") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    setIsUploading(true);
    setStatus("Uploading asset to Cloudinary...");
    try {
      const response = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus(data.message || "Upload failed.");
        return null;
      }

      setLastUploadUrl(data.url);
      setStatus("Upload successful. URL added to field.");
      return data.url as string;
    } catch {
      setStatus("Upload failed due to a network or server error.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadToCms(file);
    event.target.value = "";
  };

  const uploadAndSetField = async (
    file: File,
    onUploaded: (url: string) => void,
    folder = "portfolio-cms/images"
  ) => {
    const url = await uploadToCms(file, folder);
    if (!url) return;
    onUploaded(url);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-3 py-4 md:px-6 md:py-6">
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Portfolio CMS</p>
            <h1 className="font-mono text-2xl font-semibold md:text-3xl">Visual Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {adminEmail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20">
              {isUploading ? "Uploading..." : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-border/60 bg-card/25 px-3 py-2 text-xs text-muted-foreground">
          {status}
          {lastUploadUrl ? (
            <>
              <span className="mx-2 text-border">|</span>
              Latest URL: <span className="break-all text-foreground">{lastUploadUrl}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px,minmax(0,1fr)]">
        <aside className="rounded-2xl border border-border/60 bg-card/30 p-3 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="flex h-full min-h-0 flex-col gap-3">
            <div className="space-y-2 overflow-y-auto pr-1">
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                      isActive
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em]">{section.label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed">{section.help}</p>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-auto rounded-md border border-border/70 bg-card/30 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="rounded-2xl border border-border/60 bg-card/25 p-4 md:p-5">
          {activeSection === "overview" ? (
            <section className="space-y-4">
              <h2 className="font-mono text-lg font-semibold">Content Analytics</h2>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <MetricCard label="Projects" value={metrics.projects} />
                <MetricCard label="Featured Projects" value={metrics.featured} />
                <MetricCard label="Experiences" value={metrics.experiences} />
                <MetricCard label="Skill Tags" value={metrics.skills} />
                <MetricCard label="Certifications" value={metrics.certifications} />
                <MetricCard label="Social Links" value={metrics.socialLinks} />
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary">Section Density</p>
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectionDensityData}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip cursor={{ fill: "hsl(var(--primary) / 0.08)" }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary">Project Mix</p>
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={projectSplitData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={90}>
                          {projectSplitData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={entry.name === "Featured" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeSection === "hero" ? (
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
                  onChange={(value) =>
                    setContent((prev) => ({ ...prev, hero: { ...prev.hero, highlightedName: value } }))
                  }
                />
                <TextField
                  label="Resume URL"
                  value={content.hero.resumeUrl}
                  onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, resumeUrl: value } }))}
                />
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
                <HeaderRow title="Social Links" actionLabel="Add link" onAction={() => {
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      socials: [...prev.hero.socials, { label: "Label", href: "https://", iconUrl: "" }],
                    },
                  }));
                }} />

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
                        onUploadFile={(file) =>
                          uploadAndSetField(
                            file,
                            (url) => {
                              setContent((prev) => ({
                                ...prev,
                                hero: {
                                  ...prev.hero,
                                  socials: prev.hero.socials.map((item, idx) =>
                                    idx === index ? { ...item, iconUrl: url } : item
                                  ),
                                },
                              }));
                            },
                            "portfolio-cms/icons"
                          )
                        }
                        isUploading={isUploading}
                        showPreview
                      />
                    </FieldGrid>
                  </RowCard>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === "about" ? (
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
                  onUploadFile={(file) =>
                    uploadAndSetField(
                      file,
                      (url) => setContent((prev) => ({ ...prev, about: { ...prev.about, mapImageUrl: url } })),
                      "portfolio-cms/images"
                    )
                  }
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
          ) : null}

          {activeSection === "education" ? (
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
                  onUploadFile={(file) =>
                    uploadAndSetField(
                      file,
                      (url) =>
                        setContent((prev) => ({ ...prev, education: { ...prev.education, backgroundImageUrl: url } })),
                      "portfolio-cms/images"
                    )
                  }
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
          ) : null}

          {activeSection === "contact" ? (
            <section className="space-y-4">
              <SectionTitle title="Contact Content" />
              <TextAreaField
                label="Intro"
                value={content.contact.intro}
                onChange={(value) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, intro: value } }))}
              />

              <div className="space-y-2">
                <HeaderRow
                  title="Workflow Steps"
                  actionLabel="Add workflow step"
                  onAction={() => {
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        workflowSteps: [...prev.contact.workflowSteps, { label: "New step", iconUrl: "" }],
                      },
                    }));
                  }}
                />

                {content.contact.workflowSteps.map((step, index) => (
                  <RowCard
                    key={`workflow-step-${index}`}
                    onRemove={() => {
                      setContent((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          workflowSteps: prev.contact.workflowSteps.filter((_, idx) => idx !== index),
                        },
                      }));
                    }}
                  >
                    <FieldGrid>
                      <TextField
                        label="Step Label"
                        value={step.label}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              workflowSteps: prev.contact.workflowSteps.map((item, idx) =>
                                idx === index ? { ...item, label: value } : item
                              ),
                            },
                          }));
                        }}
                      />
                      <TextField
                        label="Step Icon URL"
                        value={step.iconUrl || ""}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              workflowSteps: prev.contact.workflowSteps.map((item, idx) =>
                                idx === index ? { ...item, iconUrl: value } : item
                              ),
                            },
                          }));
                        }}
                        onUploadFile={(file) =>
                          uploadAndSetField(
                            file,
                            (url) => {
                              setContent((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  workflowSteps: prev.contact.workflowSteps.map((item, idx) =>
                                    idx === index ? { ...item, iconUrl: url } : item
                                  ),
                                },
                              }));
                            },
                            "portfolio-cms/icons"
                          )
                        }
                        isUploading={isUploading}
                        showPreview
                      />
                    </FieldGrid>
                  </RowCard>
                ))}
              </div>

              <div className="space-y-2">
                <HeaderRow
                  title="Contact Methods"
                  actionLabel="Add contact"
                  onAction={() => {
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        contacts: [
                          ...prev.contact.contacts,
                          { label: "Label", value: "Value", href: "https://", iconUrl: "" },
                        ],
                      },
                    }));
                  }}
                />

                {content.contact.contacts.map((contact, index) => (
                  <RowCard
                    key={`contact-method-${index}`}
                    onRemove={() => {
                      setContent((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          contacts: prev.contact.contacts.filter((_, idx) => idx !== index),
                        },
                      }));
                    }}
                  >
                    <FieldGrid>
                      <TextField
                        label="Label"
                        value={contact.label}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              contacts: prev.contact.contacts.map((item, idx) =>
                                idx === index ? { ...item, label: value } : item
                              ),
                            },
                          }));
                        }}
                      />
                      <TextField
                        label="Value"
                        value={contact.value}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              contacts: prev.contact.contacts.map((item, idx) =>
                                idx === index ? { ...item, value } : item
                              ),
                            },
                          }));
                        }}
                      />
                      <TextField
                        label="Href"
                        value={contact.href}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              contacts: prev.contact.contacts.map((item, idx) =>
                                idx === index ? { ...item, href: value } : item
                              ),
                            },
                          }));
                        }}
                      />
                      <TextField
                        label="Icon URL"
                        value={contact.iconUrl || ""}
                        onChange={(value) => {
                          setContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              contacts: prev.contact.contacts.map((item, idx) =>
                                idx === index ? { ...item, iconUrl: value } : item
                              ),
                            },
                          }));
                        }}
                        onUploadFile={(file) =>
                          uploadAndSetField(
                            file,
                            (url) => {
                              setContent((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  contacts: prev.contact.contacts.map((item, idx) =>
                                    idx === index ? { ...item, iconUrl: url } : item
                                  ),
                                },
                              }));
                            },
                            "portfolio-cms/icons"
                          )
                        }
                        isUploading={isUploading}
                        showPreview
                      />
                    </FieldGrid>
                  </RowCard>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === "projects" ? (
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
                            onUploadFile={(file) =>
                              uploadAndSetField(
                                file,
                                (url) => {
                                  setContent((prev) => ({
                                    ...prev,
                                    projects: prev.projects.map((item, idx) =>
                                      idx === projectIndex
                                        ? {
                                            ...item,
                                            images: item.images.map((img, idx2) =>
                                              idx2 === imageIndex ? { ...img, src: url } : img
                                            ),
                                          }
                                        : item
                                    ),
                                  }));
                                },
                                "portfolio-cms/projects"
                              )
                            }
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
          ) : null}

          {activeSection === "experiences" ? (
            <section className="space-y-4">
              <HeaderRow
                title="Experience Entries"
                actionLabel="Add experience"
                onAction={() => {
                  setContent((prev) => ({
                    ...prev,
                    experiences: [
                      ...prev.experiences,
                      {
                        id: `experience-${Date.now().toString(36)}`,
                        title: "Role",
                        company: "Company",
                        location: "Location",
                        period: "2026",
                        highlights: ["Impact point"],
                        tech: [],
                      },
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
          ) : null}

          {activeSection === "skills" ? (
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
          ) : null}

          {activeSection === "certifications" ? (
            <section className="space-y-4">
              <HeaderRow
                title="Certifications and Awards"
                actionLabel="Add item"
                onAction={() => {
                  setContent((prev) => ({
                    ...prev,
                    certifications: [
                      ...prev.certifications,
                      {
                        id: `cert-${Date.now().toString(36)}`,
                        title: "Certification title",
                        issuer: "Issuer",
                        period: "2026",
                        type: "certification",
                        status: "completed",
                        details: "Details",
                        credentialUrl: "",
                        images: [{ src: lastUploadUrl || "", alt: "Certification image" }],
                      },
                    ],
                  }));
                }}
              />

              {content.certifications.map((certification, certificationIndex) => (
                <RowCard
                  key={`certification-${certificationIndex}`}
                  onRemove={() => {
                    setContent((prev) => ({
                      ...prev,
                      certifications: prev.certifications.filter((_, idx) => idx !== certificationIndex),
                    }));
                  }}
                >
                  <FieldGrid>
                    <TextField
                      label="Title"
                      value={certification.title}
                      onChange={(value) => {
                        setContent((prev) => ({
                          ...prev,
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex
                              ? { ...item, title: value, id: item.id || toId(value) }
                              : item
                          ),
                        }));
                      }}
                    />
                    <TextField
                      label="ID"
                      value={certification.id}
                      onChange={(value) => {
                        setContent((prev) => ({
                          ...prev,
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex ? { ...item, id: value } : item
                          ),
                        }));
                      }}
                    />
                    <TextField
                      label="Issuer"
                      value={certification.issuer}
                      onChange={(value) => {
                        setContent((prev) => ({
                          ...prev,
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex ? { ...item, issuer: value } : item
                          ),
                        }));
                      }}
                    />
                    <TextField
                      label="Period"
                      value={certification.period}
                      onChange={(value) => {
                        setContent((prev) => ({
                          ...prev,
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex ? { ...item, period: value } : item
                          ),
                        }));
                      }}
                    />
                    <label className="space-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Type</span>
                      <select
                        value={certification.type}
                        onChange={(event) => {
                          setContent((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item, idx) =>
                              idx === certificationIndex
                                ? { ...item, type: event.target.value as "award" | "certification" }
                                : item
                            ),
                          }));
                        }}
                        className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
                      >
                        <option value="certification">Certification</option>
                        <option value="award">Award</option>
                      </select>
                    </label>
                    <label className="space-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Status</span>
                      <select
                        value={certification.status}
                        onChange={(event) => {
                          setContent((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item, idx) =>
                              idx === certificationIndex
                                ? { ...item, status: event.target.value as "completed" | "in_progress" }
                                : item
                            ),
                          }));
                        }}
                        className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
                      >
                        <option value="completed">Completed</option>
                        <option value="in_progress">In progress</option>
                      </select>
                    </label>
                    <TextField
                      label="Credential URL"
                      value={certification.credentialUrl || ""}
                      onChange={(value) => {
                        setContent((prev) => ({
                          ...prev,
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex ? { ...item, credentialUrl: value } : item
                          ),
                        }));
                      }}
                    />
                  </FieldGrid>

                  <TextAreaField
                    label="Details"
                    value={certification.details}
                    onChange={(value) => {
                      setContent((prev) => ({
                        ...prev,
                        certifications: prev.certifications.map((item, idx) =>
                          idx === certificationIndex ? { ...item, details: value } : item
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
                          certifications: prev.certifications.map((item, idx) =>
                            idx === certificationIndex
                              ? {
                                  ...item,
                                  images: [...item.images, { src: lastUploadUrl || "", alt: "Certificate image" }],
                                }
                              : item
                          ),
                        }));
                      }}
                    />

                    {certification.images.map((image, imageIndex) => (
                      <RowCard
                        key={`certification-image-${certificationIndex}-${imageIndex}`}
                        onRemove={() => {
                          setContent((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item, idx) =>
                              idx === certificationIndex
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
                                certifications: prev.certifications.map((item, idx) =>
                                  idx === certificationIndex
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
                            onUploadFile={(file) =>
                              uploadAndSetField(
                                file,
                                (url) => {
                                  setContent((prev) => ({
                                    ...prev,
                                    certifications: prev.certifications.map((item, idx) =>
                                      idx === certificationIndex
                                        ? {
                                            ...item,
                                            images: item.images.map((img, idx2) =>
                                              idx2 === imageIndex ? { ...img, src: url } : img
                                            ),
                                          }
                                        : item
                                    ),
                                  }));
                                },
                                "portfolio-cms/certifications"
                              )
                            }
                            isUploading={isUploading}
                            showPreview
                          />
                          <TextField
                            label="Alt Text"
                            value={image.alt}
                            onChange={(value) => {
                              setContent((prev) => ({
                                ...prev,
                                certifications: prev.certifications.map((item, idx) =>
                                  idx === certificationIndex
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
          ) : null}

          <div className="mt-6 border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : `Save ${getSectionLabel(activeSection)} Changes`}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="font-mono text-lg font-semibold">{title}</h2>
);

const FieldGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{children}</div>
);

const TextField = ({
  label,
  value,
  onChange,
  onUploadFile,
  isUploading = false,
  showPreview = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadFile?: (file: File) => Promise<void>;
  isUploading?: boolean;
  showPreview?: boolean;
}) => (
  <label className="space-y-1">
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
    />
    {onUploadFile ? (
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex cursor-pointer items-center rounded-md border border-primary/35 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary hover:bg-primary/20">
          {isUploading ? "Uploading..." : "Upload file"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              await onUploadFile(file);
              event.target.value = "";
            }}
          />
        </span>
      </span>
    ) : null}
    {showPreview && value ? (
      <img
        src={value}
        alt={`${label} preview`}
        className="h-14 w-14 rounded-md border border-border/60 bg-card/30 object-cover"
      />
    ) : null}
  </label>
);

const TextAreaField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <label className="space-y-1">
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-24 w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
    />
  </label>
);

const MetricCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-xl border border-border/60 bg-background/40 p-3">
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    <p className="mt-2 font-mono text-3xl font-semibold text-primary">{value}</p>
  </div>
);

const HeaderRow = ({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-primary">{title}</h3>
    <button
      type="button"
      onClick={onAction}
      className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20"
    >
      {actionLabel}
    </button>
  </div>
);

const RowCard = ({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) => (
  <div className="space-y-3 rounded-xl border border-border/60 bg-background/40 p-3">
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onRemove}
        className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20"
      >
        Remove
      </button>
    </div>
    {children}
  </div>
);

const ArrayEditor = ({
  title,
  items,
  onChange,
  addLabel,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) => (
  <div className="space-y-2">
    <HeaderRow
      title={title}
      actionLabel={addLabel}
      onAction={() => onChange([...items, "New item"])}
    />

    {items.map((item, index) => (
      <RowCard key={`array-item-${index}`} onRemove={() => onChange(items.filter((_, idx) => idx !== index))}>
        <TextField
          label={`${title} ${index + 1}`}
          value={item}
          onChange={(value) => {
            onChange(items.map((current, idx) => (idx === index ? value : current)));
          }}
        />
      </RowCard>
    ))}
  </div>
);

export default AdminDashboard;
