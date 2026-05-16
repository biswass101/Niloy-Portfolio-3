"use client";

import { getSectionLabel, type SectionKey } from "@/components/admin/AdminSections";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";

type AdminSaveBarProps = {
  sectionKey: SectionKey;
};

const AdminSaveBar = ({ sectionKey }: AdminSaveBarProps) => {
  const { isSaving, saveContent } = useAdminCms();

  return (
    <div className="mt-6 border-t border-border/60 pt-4">
      <button
        type="button"
        onClick={saveContent}
        disabled={isSaving}
        className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : `Save ${getSectionLabel(sectionKey)} Changes`}
      </button>
    </div>
  );
};

export default AdminSaveBar;
