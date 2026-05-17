"use client";

import { useRef, useState } from "react";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import { useToast } from "@/hooks/use-toast";
import {
  ArrayEditor,
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

const AdminHeroSection = () => {
  const {
    content,
    savedContent,
    setContent,
    uploadToCms,
    deleteFromCms,
    setStatus,
    saveContent,
    isSaving,
  } = useAdminCms();
  const { toast } = useToast();

  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [isResumeDeleting, setIsResumeDeleting] = useState(false);
  const [iconUploadingIndex, setIconUploadingIndex] = useState<number | null>(null);
  const [iconDeletingIndex, setIconDeletingIndex] = useState<number | null>(null);
  const socialKeysRef = useRef<string[]>([]);
  const confirmActionRef = useRef<(() => Promise<void>) | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");

  if (socialKeysRef.current.length < content.hero.socials.length) {
    const missing = content.hero.socials.length - socialKeysRef.current.length;
    socialKeysRef.current = [
      ...socialKeysRef.current,
      ...Array.from({ length: missing }, () => `social-${Math.random().toString(36).slice(2, 10)}`),
    ];
  } else if (socialKeysRef.current.length > content.hero.socials.length) {
    socialKeysRef.current = socialKeysRef.current.slice(0, content.hero.socials.length);
  }

  const requestConfirm = (title: string, description: string, action: () => Promise<void>) => {
    confirmActionRef.current = action;
    setConfirmTitle(title);
    setConfirmDescription(description);
    setConfirmOpen(true);
  };

  const introCurrent = {
    greeting: content.hero.greeting,
    firstName: content.hero.firstName,
    highlightedName: content.hero.highlightedName,
    resumeUrl: content.hero.resumeUrl,
    resumePublicId: content.hero.resumePublicId,
    location: content.hero.location,
    summary: content.hero.summary,
  };
  const introSaved = {
    greeting: savedContent.hero.greeting,
    firstName: savedContent.hero.firstName,
    highlightedName: savedContent.hero.highlightedName,
    resumeUrl: savedContent.hero.resumeUrl,
    resumePublicId: savedContent.hero.resumePublicId,
    location: savedContent.hero.location,
    summary: savedContent.hero.summary,
  };

  const isIntroDirty = JSON.stringify(introCurrent) !== JSON.stringify(introSaved);

  const getPrependedCount = <T,>(
    current: T[],
    saved: T[],
    isEqual: (left: T, right: T) => boolean
  ) => {
    if (current.length <= saved.length) return 0;
    const savedSuffix = current.slice(current.length - saved.length);
    const isPrepended = savedSuffix.every((item, index) => isEqual(item, saved[index]));
    return isPrepended ? current.length - saved.length : 0;
  };

  const newTitleCount = getPrependedCount(
    content.hero.titles,
    savedContent.hero.titles,
    (left, right) => left === right
  );
  const newSocialCount = getPrependedCount(
    content.hero.socials,
    savedContent.hero.socials,
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

  const getSavedTitleAt = (index: number) => {
    if (newTitleCount > 0) {
      return index >= newTitleCount ? savedContent.hero.titles[index - newTitleCount] : undefined;
    }
    return savedContent.hero.titles[index];
  };

  const getSavedSocialAt = (index: number) => {
    if (newSocialCount > 0) {
      return index >= newSocialCount ? savedContent.hero.socials[index - newSocialCount] : undefined;
    }
    return savedContent.hero.socials[index];
  };

  const handleIntroSave = async () => {
    const saved = await saveContent(content);
    if (saved) {
      toast({
        variant: "success",
        title: "Intro saved",
        description: "Hero intro changes are live.",
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Save failed",
      description: "Please try again.",
    });
  };

  const handleTitleSave = async (index: number) => {
    const currentTitles = content.hero.titles;
    const nextTitles = [...currentTitles];

    if (index < newTitleCount) {
      const [moved] = nextTitles.splice(index, 1);
      nextTitles.push(moved);
    }

    const payload = {
      ...content,
      hero: {
        ...content.hero,
        titles: nextTitles,
      },
    };

    const saved = await saveContent(payload);
    if (saved) {
      toast({
        variant: "success",
        title: "Title saved",
        description: "Animated title is updated.",
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Save failed",
      description: "Please try again.",
    });
  };

  const handleSocialSave = async (index: number) => {
    const currentSocials = content.hero.socials;
    const nextSocials = [...currentSocials];

    if (index < newSocialCount) {
      const [moved] = nextSocials.splice(index, 1);
      nextSocials.push(moved);
    }

    const payload = {
      ...content,
      hero: {
        ...content.hero,
        socials: nextSocials,
      },
    };

    const saved = await saveContent(payload);
    if (saved) {
      toast({
        variant: "success",
        title: "Social saved",
        description: "Social link is updated.",
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Save failed",
      description: "Please try again.",
    });
  };

  const handleResumeDelete = async () => {
    if (!content.hero.resumeUrl && !content.hero.resumePublicId) return;

    requestConfirm("Delete resume?", "This will remove the resume link from the database.", async () => {
      setIsResumeDeleting(true);

      const publicId = content.hero.resumePublicId?.trim();
      try {
        if (publicId) {
          const deleted = await deleteFromCms(publicId, "raw");
          if (!deleted) {
            toast({
              variant: "destructive",
              title: "Resume delete failed",
              description: "Please try again.",
            });
            return;
          }
        }

        const resumeNextContent = {
          ...content,
          hero: { ...content.hero, resumeUrl: "", resumePublicId: "" },
        };

        setContent(resumeNextContent);
        const saved = await saveContent(resumeNextContent);
        if (!saved) {
          toast({
            variant: "destructive",
            title: "Save failed",
            description: "Please try again.",
          });
          return;
        }

        setStatus("Resume deleted and saved.");
        toast({
          variant: "success",
          title: "Resume deleted",
          description: "Changes saved to the database.",
        });
      } finally {
        setIsResumeDeleting(false);
      }
    });
  };

  const handleSocialIconDelete = async (index: number) => {
    const target = content.hero.socials[index];
    if (!target?.iconUrl && !target?.iconPublicId) return;

    requestConfirm("Delete icon?", "This will remove the icon from Cloudinary.", async () => {
      setIconDeletingIndex(index);

      const publicId = target.iconPublicId?.trim();
      try {
        if (publicId) {
          const deleted = await deleteFromCms(publicId, "image");
          if (!deleted) {
            toast({
              variant: "destructive",
              title: "Icon delete failed",
              description: "Please try again.",
            });
            return;
          }
        }

        const nextSocials = content.hero.socials.map((item, idx) =>
          idx === index ? { ...item, iconUrl: "", iconPublicId: "" } : item
        );
        const iconNextContent = {
          ...content,
          hero: {
            ...content.hero,
            socials: nextSocials,
          },
        };

        setContent(iconNextContent);
        const saved = await saveContent(iconNextContent);
        if (!saved) {
          toast({
            variant: "destructive",
            title: "Save failed",
            description: "Please try again.",
          });
          return;
        }

        setStatus("Social icon deleted and saved.");
        toast({
          variant: "success",
          title: "Icon deleted",
          description: "Changes saved to the database.",
        });
      } finally {
        setIconDeletingIndex(null);
      }
    });
  };

  const handleTitleRemove = async (index: number, items: string[]) => {
    requestConfirm("Delete title?", "This will remove the title from the database.", async () => {
      const nextTitles = items.filter((_, idx) => idx !== index);
      const titleNextContent = {
        ...content,
        hero: {
          ...content.hero,
          titles: nextTitles,
        },
      };

      setContent(titleNextContent);
      const saved = await saveContent(titleNextContent);
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
        title: "Title deleted",
        description: "Changes saved to the database.",
      });
    });
    return true;
  };

  const handleSocialRemove = async (index: number) => {
    requestConfirm("Delete social link?", "This will remove the link and icon.", async () => {
      const target = content.hero.socials[index];
      const publicId = target?.iconPublicId?.trim();
      if (publicId) {
        const deleted = await deleteFromCms(publicId, "image");
        if (!deleted) {
          toast({
            variant: "destructive",
            title: "Icon delete failed",
            description: "Please try again.",
          });
          return;
        }
      }

      const nextSocials = content.hero.socials.filter((_, idx) => idx !== index);
      const socialNextContent = {
        ...content,
        hero: {
          ...content.hero,
          socials: nextSocials,
        },
      };

      setContent(socialNextContent);
      const saved = await saveContent(socialNextContent);
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
        title: "Social link deleted",
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
              onClick={async () => {
                setConfirmOpen(false);
                const action = confirmActionRef.current;
                confirmActionRef.current = null;
                if (action) {
                  await action();
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="space-y-1">
        <SectionTitle title="Hero Content" />
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Primary headline and call-to-action copy
        </p>
      </div>
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
          onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, highlightedName: value } }))}
        />
        <div className="space-y-2">
          <TextField
            label="Resume URL"
            value={content.hero.resumeUrl}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, resumeUrl: value, resumePublicId: "" },
              }))
            }
            onUploadFile={async (file) => {
              setIsResumeUploading(true);
              try {
                const uploaded = await uploadToCms(file, "portfolio-cms/resumes", "raw");
                if (!uploaded) {
                  toast({
                    variant: "destructive",
                    title: "Resume upload failed",
                    description: "Please try again.",
                  });
                  return;
                }
                setContent((prev) => ({
                  ...prev,
                  hero: {
                    ...prev.hero,
                    resumeUrl: uploaded.url,
                    resumePublicId: uploaded.publicId,
                  },
                }));
                toast({
                  variant: "success",
                  title: "Resume uploaded",
                  description: "Save changes to update the portfolio.",
                });
              } finally {
                setIsResumeUploading(false);
              }
            }}
            isUploading={isResumeUploading}
            uploadAccept=".pdf,application/pdf"
            uploadAction={
              <button
                type="button"
                onClick={handleResumeDelete}
                disabled={isResumeDeleting || (!content.hero.resumeUrl && !content.hero.resumePublicId)}
                className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20 disabled:opacity-60"
              >
                {isResumeDeleting ? "Deleting..." : "Delete resume"}
              </button>
            }
          />
        </div>
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

      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleIntroSave}
          disabled={isSaving || !isIntroDirty}
          className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Intro Changes"}
        </button>
      </div>

      <ArrayEditor
        title="Animated Titles"
        items={content.hero.titles}
        onChange={(items) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titles: items } }))}
        addLabel="Add title"
        onRemoveItem={handleTitleRemove}
        onAdd={() =>
          setContent((prev) => ({
            ...prev,
            hero: { ...prev.hero, titles: ["New item", ...prev.hero.titles] },
          }))
        }
        renderItemActions={(index) => {
          const currentTitle = content.hero.titles[index];
          const savedTitle = getSavedTitleAt(index);
          const isDirty = currentTitle !== savedTitle;
          if (!isDirty) return null;
          return (
            <button
              type="button"
              onClick={() => handleTitleSave(index)}
              disabled={isSaving}
              className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          );
        }}
      />

      <div className="space-y-2">
        <HeaderRow
          title="Social Links"
          actionLabel="Add link"
          onAction={() => {
            setContent((prev) => ({
              ...prev,
              hero: {
                ...prev.hero,
                socials: [
                  { label: "Label", href: "https://", iconUrl: "", iconPublicId: "" },
                  ...prev.hero.socials,
                ],
              },
            }));
          }}
        />

        {content.hero.socials.map((social, index) => (
          <RowCard
            key={socialKeysRef.current[index]}
            actions={(() => {
              const savedSocial = getSavedSocialAt(index);
              const isDirty = JSON.stringify(social) !== JSON.stringify(savedSocial);
              if (!isDirty) return null;
              return (
                <button
                  type="button"
                  onClick={() => handleSocialSave(index)}
                  disabled={isSaving}
                  className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              );
            })()}
            onRemove={() => {
              void handleSocialRemove(index);
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
                        idx === index ? { ...item, iconUrl: value, iconPublicId: "" } : item
                      ),
                    },
                  }));
                }}
                onUploadFile={async (file) => {
                  setIconUploadingIndex(index);
                  try {
                    const uploaded = await uploadToCms(file, "portfolio-cms/icons");
                    if (!uploaded) {
                      toast({
                        variant: "destructive",
                        title: "Icon upload failed",
                        description: "Please try again.",
                      });
                      return;
                    }
                    setContent((prev) => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        socials: prev.hero.socials.map((item, idx) =>
                          idx === index
                            ? { ...item, iconUrl: uploaded.url, iconPublicId: uploaded.publicId }
                            : item
                        ),
                      },
                    }));
                    toast({
                      variant: "success",
                      title: "Icon uploaded",
                      description: "Save changes to update the portfolio.",
                    });
                  } finally {
                    setIconUploadingIndex(null);
                  }
                }}
                isUploading={iconUploadingIndex === index}
                showPreview
                uploadDisabled={Boolean(social.iconPublicId)}
                uploadAction={
                  <button
                    type="button"
                    onClick={() => handleSocialIconDelete(index)}
                    disabled={
                      iconDeletingIndex === index || (!social.iconUrl && !social.iconPublicId)
                    }
                    className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20 disabled:opacity-60"
                  >
                    {iconDeletingIndex === index ? "Deleting..." : "Remove icon"}
                  </button>
                }
              />
            </FieldGrid>
          </RowCard>
        ))}
      </div>
    </section>
  );
};

export default AdminHeroSection;
