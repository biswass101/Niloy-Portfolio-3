import { MetricCard } from "@/components/admin/AdminDashboardFields";
import type { DashboardMetrics } from "@/components/admin/AdminDashboardOverviewTypes";

type AdminDashboardOverviewMetricsProps = {
  metrics: DashboardMetrics;
};

const AdminDashboardOverviewMetrics = ({ metrics }: AdminDashboardOverviewMetricsProps) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
    <MetricCard label="Projects" value={metrics.projects} />
    <MetricCard label="Featured Projects" value={metrics.featured} />
    <MetricCard label="Experiences" value={metrics.experiences} />
    <MetricCard label="Skill Tags" value={metrics.skills} />
    <MetricCard label="Certifications" value={metrics.certifications} />
    <MetricCard label="Social Links" value={metrics.socialLinks} />
  </div>
);

export default AdminDashboardOverviewMetrics;
