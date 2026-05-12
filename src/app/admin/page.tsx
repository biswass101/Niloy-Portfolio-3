import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { CMS_AUTH_COOKIE, verifyCmsToken } from "@/lib/auth";
import { getAdminPortfolioContent } from "@/lib/cms-store";

const AdminPage = async () => {
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

  return <AdminDashboard initialContent={content} adminEmail={decoded.email} />;
};

export default AdminPage;
