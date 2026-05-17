"use client";

import { useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import {
  FieldGrid,
  HeaderRow,
  RowCard,
  SectionTitle,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminDashboardFields";
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

const AdminContactSection = () => {
  const { content, savedContent, setContent, uploadToCms, isUploading, saveContent, isSaving } = useAdminCms();
  const { toast } = useToast();
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

  const isIntroDirty = content.contact.intro !== savedContent.contact.intro;

  const getPrependedCount = <T,>(current: T[], saved: T[], isEqual: (left: T, right: T) => boolean) => {
    if (current.length <= saved.length) return 0;
    const savedSuffix = current.slice(current.length - saved.length);
    const isPrepended = savedSuffix.every((item, index) => isEqual(item, saved[index]));
    return isPrepended ? current.length - saved.length : 0;
  };

  const newWorkflowCount = getPrependedCount(
    content.contact.workflowSteps,
    savedContent.contact.workflowSteps,
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );
  const newContactCount = getPrependedCount(
    content.contact.contacts,
    savedContent.contact.contacts,
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

  const getSavedWorkflowAt = (index: number) => {
    if (newWorkflowCount > 0) {
      return index >= newWorkflowCount ? savedContent.contact.workflowSteps[index - newWorkflowCount] : undefined;
    }
    return savedContent.contact.workflowSteps[index];
  };

  const getSavedContactAt = (index: number) => {
    if (newContactCount > 0) {
      return index >= newContactCount ? savedContent.contact.contacts[index - newContactCount] : undefined;
    }
    return savedContent.contact.contacts[index];
  };

  const handleIntroSave = async () => {
    const draftWorkflow = content.contact.workflowSteps;
    const draftContacts = content.contact.contacts;
    const payload = {
      ...content,
      contact: {
        ...content.contact,
        workflowSteps: savedContent.contact.workflowSteps,
        contacts: savedContent.contact.contacts,
      },
    };

    const saved = await saveContent(payload);
    if (!saved) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Please try again.",
      });
      return;
    }

    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        workflowSteps: draftWorkflow,
        contacts: draftContacts,
      },
    }));
    toast({
      variant: "success",
      title: "Contact intro saved",
      description: "Intro text is updated.",
    });
  };

  const handleWorkflowSave = async (index: number) => {
    const currentSteps = content.contact.workflowSteps;
    const nextSteps = [...currentSteps];
    if (index < newWorkflowCount) {
      const [moved] = nextSteps.splice(index, 1);
      nextSteps.push(moved);
    }

    const payload = {
      ...content,
      contact: {
        ...content.contact,
        workflowSteps: nextSteps,
      },
    };

    const saved = await saveContent(payload);
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
      title: "Workflow step saved",
      description: "Step is updated.",
    });
  };

  const handleContactSave = async (index: number) => {
    const currentContacts = content.contact.contacts;
    const nextContacts = [...currentContacts];
    if (index < newContactCount) {
      const [moved] = nextContacts.splice(index, 1);
      nextContacts.push(moved);
    }

    const payload = {
      ...content,
      contact: {
        ...content.contact,
        contacts: nextContacts,
      },
    };

    const saved = await saveContent(payload);
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
      title: "Contact method saved",
      description: "Contact method is updated.",
    });
  };

  const handleWorkflowRemove = async (index: number) => {
    requestConfirm(
      "Delete workflow step?",
      "This will remove the workflow step permanently from the database.",
      async () => {
        const nextSteps = content.contact.workflowSteps.filter((_, idx) => idx !== index);
        const nextContent = {
          ...content,
          contact: {
            ...content.contact,
            workflowSteps: nextSteps,
          },
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
          title: "Workflow step deleted",
          description: "Changes saved to the database.",
        });
      }
    );
  };

  const handleContactRemove = async (index: number) => {
    requestConfirm(
      "Delete contact method?",
      "This will remove the contact method permanently from the database.",
      async () => {
        const nextContacts = content.contact.contacts.filter((_, idx) => idx !== index);
        const nextContent = {
          ...content,
          contact: {
            ...content.contact,
            contacts: nextContacts,
          },
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
          title: "Contact method deleted",
          description: "Changes saved to the database.",
        });
      }
    );
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

      <div className="space-y-1">
        <SectionTitle title="Contact Content" />
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Intro message shown above workflow and contact methods
        </p>
      </div>
      <TextAreaField
        label="Intro"
        value={content.contact.intro}
        onChange={(value) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, intro: value } }))}
      />
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleIntroSave}
          disabled={isSaving || !isIntroDirty}
          className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Contact Intro"}
        </button>
      </div>

      <div className="space-y-2">
        <HeaderRow
          title="Workflow Steps"
          actionLabel="Add workflow step"
          onAction={() => {
            setContent((prev) => ({
              ...prev,
              contact: {
                ...prev.contact,
                workflowSteps: [{ label: "New step", iconUrl: "" }, ...prev.contact.workflowSteps],
              },
            }));
          }}
        />

        {content.contact.workflowSteps.map((step, index) => (
          <RowCard
            key={`workflow-step-${index}`}
            actions={(() => {
              const savedStep = getSavedWorkflowAt(index);
              const isDirty = JSON.stringify(step) !== JSON.stringify(savedStep);
              if (!isDirty) return null;
              return (
                <button
                  type="button"
                  onClick={() => void handleWorkflowSave(index)}
                  disabled={isSaving}
                  className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              );
            })()}
            onRemove={() => {
              void handleWorkflowRemove(index);
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
                  { label: "Label", value: "Value", href: "https://", iconUrl: "" },
                  ...prev.contact.contacts,
                ],
              },
            }));
          }}
        />

        {content.contact.contacts.map((contact, index) => (
          <RowCard
            key={`contact-method-${index}`}
            actions={(() => {
              const savedMethod = getSavedContactAt(index);
              const isDirty = JSON.stringify(contact) !== JSON.stringify(savedMethod);
              if (!isDirty) return null;
              return (
                <button
                  type="button"
                  onClick={() => void handleContactSave(index)}
                  disabled={isSaving}
                  className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              );
            })()}
            onRemove={() => {
              void handleContactRemove(index);
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
