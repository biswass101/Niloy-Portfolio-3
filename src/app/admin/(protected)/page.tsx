import { redirect } from "next/navigation";

const AdminRootPage = () => {
  redirect("/admin/overview");
};

export default AdminRootPage;
