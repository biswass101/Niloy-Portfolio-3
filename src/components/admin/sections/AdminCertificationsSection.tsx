"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { HeaderRow, RowCard, TextAreaField, TextField, FieldGrid } from "@/components/admin/AdminDashboardFields";
import { toId } from "@/components/admin/adminUtils";

const AdminCertificationsSection = () => {
  const { content, setContent, uploadToCms, isUploading, lastUploadUrl } = useAdminCms();

  return (
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
                    idx === certificationIndex ? { ...item, title: value, id: item.id || toId(value) } : item
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
                    onUploadFile={async (file) => {
                      const uploaded = await uploadToCms(file, "portfolio-cms/certifications");
                      if (!uploaded) return;
                      setContent((prev) => ({
                        ...prev,
                        certifications: prev.certifications.map((item, idx) =>
                          idx === certificationIndex
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
  );
};

export default AdminCertificationsSection;
