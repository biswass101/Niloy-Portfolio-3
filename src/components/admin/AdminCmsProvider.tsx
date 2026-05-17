"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioContent } from "@/types/cms";

type UploadResult = { url: string; publicId: string };

type AdminCmsContextValue = {
  adminEmail: string;
  content: PortfolioContent;
  savedContent: PortfolioContent;
  setContent: React.Dispatch<React.SetStateAction<PortfolioContent>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  isSaving: boolean;
  saveContent: (nextContent?: PortfolioContent) => Promise<boolean>;
  isUploading: boolean;
  uploadToCms: (
    file: File,
    folder?: string,
    resourceType?: "image" | "raw"
  ) => Promise<UploadResult | null>;
  lastUploadUrl: string;
  isDeleting: boolean;
  deleteFromCms: (publicId: string, resourceType: "image" | "raw") => Promise<boolean>;
};

const AdminCmsContext = createContext<AdminCmsContextValue | null>(null);

const cloneContent = (value: PortfolioContent) => JSON.parse(JSON.stringify(value)) as PortfolioContent;

export const useAdminCms = () => {
  const context = useContext(AdminCmsContext);
  if (!context) {
    throw new Error("useAdminCms must be used within AdminCmsProvider");
  }
  return context;
};

type AdminCmsProviderProps = {
  initialContent: PortfolioContent;
  adminEmail: string;
  children: ReactNode;
};

const AdminCmsProvider = ({ initialContent, adminEmail, children }: AdminCmsProviderProps) => {
  const router = useRouter();
  const [content, setContent] = useState<PortfolioContent>(() => cloneContent(initialContent));
  const [savedContent, setSavedContent] = useState<PortfolioContent>(() => cloneContent(initialContent));
  const [status, setStatus] = useState("Visual CMS ready. Update any section and save from that section.");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lastUploadUrl, setLastUploadUrl] = useState("");

  const saveContent = useCallback(async (nextContent?: PortfolioContent) => {
    const payload = nextContent || content;
    setIsSaving(true);
    setStatus("Saving portfolio content to MongoDB...");

    const response = await fetch("/api/cms/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || "Save failed.");
      setIsSaving(false);
      return false;
    }

    const savedNextContent = cloneContent(data.content);
    setContent(savedNextContent);
    setSavedContent(savedNextContent);
    setStatus("Saved successfully. Public portfolio now uses updated DB data.");
    setIsSaving(false);
    router.refresh();
    return true;
  }, [content, router]);

  const uploadToCms = useCallback(
    async (
      file: File,
      folder = "portfolio-cms",
      resourceType: "image" | "raw" = "image"
    ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("resourceType", resourceType);

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
      return { url: data.url as string, publicId: data.publicId as string };
    } catch {
      setStatus("Upload failed due to a network or server error.");
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const deleteFromCms = useCallback(async (publicId: string, resourceType: "image" | "raw") => {
    setIsDeleting(true);
    setStatus("Deleting asset from Cloudinary...");

    try {
      const response = await fetch("/api/cms/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId, resourceType }),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus(data.message || "Delete failed.");
        return false;
      }

      setStatus("Delete successful.");
      return true;
    } catch {
      setStatus("Delete failed due to a network or server error.");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      adminEmail,
      content,
      savedContent,
      setContent,
      status,
      setStatus,
      isSaving,
      saveContent,
      isUploading,
      uploadToCms,
      lastUploadUrl,
      isDeleting,
      deleteFromCms,
    }),
    [
      adminEmail,
      content,
      savedContent,
      status,
      isSaving,
      saveContent,
      isUploading,
      uploadToCms,
      lastUploadUrl,
      isDeleting,
      deleteFromCms,
    ]
  );

  return <AdminCmsContext.Provider value={value}>{children}</AdminCmsContext.Provider>;
};

export default AdminCmsProvider;
