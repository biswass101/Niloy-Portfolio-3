"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioContent } from "@/types/cms";

type AdminDashboardProps = {
  initialContent: PortfolioContent;
  adminEmail: string;
};

const AdminDashboard = ({ initialContent, adminEmail }: AdminDashboardProps) => {
  const router = useRouter();
  const [jsonText, setJsonText] = useState(() => JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const parsedJson = useMemo(() => {
    try {
      return JSON.parse(jsonText) as PortfolioContent;
    } catch {
      return null;
    }
  }, [jsonText]);

  const handleSave = async () => {
    if (!parsedJson) {
      setStatus("JSON is invalid. Fix formatting before save.");
      return;
    }

    setIsSaving(true);
    setStatus("Saving changes...");

    const response = await fetch("/api/cms/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedJson),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || "Save failed.");
      setIsSaving(false);
      return;
    }

    setJsonText(JSON.stringify(data.content, null, 2));
    setStatus("Saved successfully.");
    setIsSaving(false);
    router.refresh();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "portfolio-cms");

    setIsUploading(true);
    setStatus("Uploading image to Cloudinary...");

    const response = await fetch("/api/cms/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || "Upload failed.");
      setIsUploading(false);
      return;
    }

    setStatus(`Upload successful. URL: ${data.url}`);
    setIsUploading(false);
    event.target.value = "";
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border/60 bg-card/35 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Portfolio CMS</p>
          <h1 className="font-mono text-2xl font-semibold">Content Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">Logged in as {adminEmail}</p>
        </div>

        <div className="flex flex-wrap gap-2">
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

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save JSON"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-border/70 bg-card/30 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-md border border-border/60 bg-card/25 px-4 py-2 text-xs text-muted-foreground">
        {status || "Tip: upload image -> copy URL -> paste inside JSON fields (hero/about/projects/certifications)."}
      </div>

      <textarea
        value={jsonText}
        onChange={(event) => setJsonText(event.target.value)}
        className="h-[70vh] w-full rounded-xl border border-border/60 bg-background/80 p-4 font-mono text-xs leading-relaxed text-foreground outline-none focus:border-primary/50"
        spellCheck={false}
      />
    </div>
  );
};

export default AdminDashboard;
