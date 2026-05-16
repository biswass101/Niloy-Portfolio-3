import AdminDashboardOverviewCharts, {
  type OverviewChartDatum,
} from "@/components/admin/AdminDashboardOverviewCharts";
import AdminDashboardOverviewHeader from "@/components/admin/AdminDashboardOverviewHeader";
import AdminDashboardOverviewMetrics from "@/components/admin/AdminDashboardOverviewMetrics";
import type { DashboardMetrics } from "@/components/admin/AdminDashboardOverviewTypes";

type AdminDashboardOverviewProps = {
  adminEmail: string;
  status: string;
  lastUploadUrl: string;
  metrics: DashboardMetrics;
  sectionDensityData: OverviewChartDatum[];
  projectSplitData: OverviewChartDatum[];
};

const AdminDashboardOverview = ({
  adminEmail,
  status,
  lastUploadUrl,
  metrics,
  sectionDensityData,
  projectSplitData,
}: AdminDashboardOverviewProps) => (
  <section className="space-y-4">
    <AdminDashboardOverviewHeader
      adminEmail={adminEmail}
      status={status}
      lastUploadUrl={lastUploadUrl}
    />

    <h2 className="font-mono text-lg font-semibold">Content Analytics</h2>

    <AdminDashboardOverviewMetrics metrics={metrics} />

    <AdminDashboardOverviewCharts
      sectionDensityData={sectionDensityData}
      projectSplitData={projectSplitData}
    />
  </section>
);

export default AdminDashboardOverview;
