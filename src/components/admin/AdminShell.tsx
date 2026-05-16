"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSectionRoute, sections, type SectionKey } from "@/components/admin/AdminSections";

const getActiveSection = (pathname: string): SectionKey => {
  const segment = pathname.split("/")[2] || "overview";
  return (sections.find((section) => section.key === segment)?.key || "overview") as SectionKey;
};

const AdminShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-3 py-4 md:px-6 md:py-6">
      <div className="grid gap-4 lg:grid-cols-[320px,minmax(0,1fr)]">
        <aside className="rounded-2xl border border-border/60 bg-card/30 p-3 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="flex h-full min-h-0 flex-col gap-3">
            <div className="space-y-2 overflow-y-auto pr-1">
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <Link
                    key={section.key}
                    href={getSectionRoute(section.key)}
                    className={`block w-full rounded-lg border px-3 py-2 text-left transition ${
                      isActive
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em]">{section.label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed">{section.help}</p>
                  </Link>
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
