"use client";

import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import {
  FieldGrid,
  HeaderRow,
  RowCard,
  SectionTitle,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminDashboardFields";

const AdminContactSection = () => {
  const { content, setContent, uploadToCms, isUploading } = useAdminCms();

  return (
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
                onUploadFile={async (file) => {
                  const uploaded = await uploadToCms(file, "portfolio-cms/icons");
                  if (!uploaded) return;
                  setContent((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      workflowSteps: prev.contact.workflowSteps.map((item, idx) =>
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
                onUploadFile={async (file) => {
                  const uploaded = await uploadToCms(file, "portfolio-cms/icons");
                  if (!uploaded) return;
                  setContent((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      contacts: prev.contact.contacts.map((item, idx) =>
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

export default AdminContactSection;
