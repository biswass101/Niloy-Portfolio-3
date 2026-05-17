"use client";

import { useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import {
  ArrayEditor,
  FieldGrid,
  SectionTitle,
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

const AdminEducationSection = () => {
  const { content, savedContent, setContent, uploadToCms, isUploading, saveContent, isSaving } = useAdminCms();
  const { toast } = useToast();
  const confirmActionRef = useRef<(() => Promise<void>) | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const requestConfirm = (action: () => Promise<void>) => {
    confirmActionRef.current = action;
    setConfirmOpen(true);
  };

  const handleDetailRemove = async (index: number, items: string[]) => {
    requestConfirm(async () => {
      const nextDetails = items.filter((_, idx) => idx !== index);
      const nextContent = {
        ...content,
        education: {
          ...content.education,
          details: nextDetails,
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
        title: "Detail deleted",
        description: "Changes saved to the database.",
      });
    });
    return true;
  };

  const groupOneCurrent = {
    title: content.education.title,
    organization: content.education.organization,
    period: content.education.period,
    backgroundImageUrl: content.education.backgroundImageUrl || "",
  };
  const groupOneSaved = {
    title: savedContent.education.title,
    organization: savedContent.education.organization,
    period: savedContent.education.period,
    backgroundImageUrl: savedContent.education.backgroundImageUrl || "",
  };
  const isGroupOneDirty = JSON.stringify(groupOneCurrent) !== JSON.stringify(groupOneSaved);

  const getPrependedCount = (current: string[], saved: string[]) => {
    if (current.length <= saved.length) return 0;
    const savedSuffix = current.slice(current.length - saved.length);
    const isPrepended = savedSuffix.every((item, index) => item === saved[index]);
    return isPrepended ? current.length - saved.length : 0;
  };

  const newDetailCount = getPrependedCount(content.education.details, savedContent.education.details);
  const getSavedDetailAt = (index: number) => {
    if (newDetailCount > 0) {
      return index >= newDetailCount ? savedContent.education.details[index - newDetailCount] : undefined;
    }
    return savedContent.education.details[index];
  };

  const handleGroupOneSave = async () => {
    const draftDetails = content.education.details;
    const payload = {
      ...content,
      education: {
        ...content.education,
        details: savedContent.education.details,
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
      education: {
        ...prev.education,
        details: draftDetails,
      },
    }));
    toast({
      variant: "success",
      title: "Education info saved",
      description: "Core education content is updated.",
    });
  };

  const handleDetailSave = async (index: number) => {
    const currentDetails = content.education.details;
    const nextDetails = [...currentDetails];

    if (index < newDetailCount) {
      const [moved] = nextDetails.splice(index, 1);
      nextDetails.push(moved);
    }

    const payload = {
      ...content,
      education: {
        ...content.education,
        details: nextDetails,
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
      title: "Detail saved",
      description: "Education detail is updated.",
    });
  };

  return (
    <section className="space-y-4">
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete education detail?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the detail permanently from the database.
            </AlertDialogDescription>
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
        <SectionTitle title="Education Content" />
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Core degree information shown in the education card
        </p>
      </div>
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
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleGroupOneSave}
          disabled={isSaving || !isGroupOneDirty}
          className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Education Info"}
        </button>
      </div>

      <ArrayEditor
        title="Education Details"
        items={content.education.details}
        onChange={(items) => setContent((prev) => ({ ...prev, education: { ...prev.education, details: items } }))}
        addLabel="Add detail"
        onRemoveItem={handleDetailRemove}
        onAdd={() =>
          setContent((prev) => ({
            ...prev,
            education: { ...prev.education, details: ["New item", ...prev.education.details] },
          }))
        }
        renderItemActions={(index) => {
          const currentDetail = content.education.details[index];
          const savedDetail = getSavedDetailAt(index);
          const isDirty = currentDetail !== savedDetail;
          if (!isDirty) return null;
          return (
            <button
              type="button"
              onClick={() => void handleDetailSave(index)}
              disabled={isSaving}
              className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          );
        }}
      />
    </section>
  );
};

export default AdminEducationSection;
