import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_AUTH_COOKIE, verifyCmsToken } from "@/lib/auth";
import { getAdminPortfolioContent } from "@/lib/cms-store";
import AdminCmsProvider from "@/components/admin/AdminCmsProvider";
import AdminShell from "@/components/admin/AdminShell";

type AdminProtectedLayoutProps = {
  children: ReactNode;
};

const AdminProtectedLayout = async ({ children }: AdminProtectedLayoutProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_AUTH_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  let decoded;
  try {
    decoded = verifyCmsToken(token);
  } catch {
    redirect("/admin/login");
  }

  const content = await getAdminPortfolioContent();

  return (
    <AdminCmsProvider initialContent={content} adminEmail={decoded.email}>
      <AdminShell>{children}</AdminShell>
    </AdminCmsProvider>
  );
};

export default AdminProtectedLayout;
