"use client";

import { useMemo } from "react";
import AdminDashboardOverview from "@/components/admin/AdminDashboardOverview";
import type { DashboardMetrics } from "@/components/admin/AdminDashboardOverviewTypes";
import { useAdminCms } from "@/components/admin/AdminCmsProvider";
import type { OverviewChartDatum } from "@/components/admin/AdminDashboardOverviewCharts";

const AdminOverviewSection = () => {
  const { adminEmail, content, status, lastUploadUrl } = useAdminCms();

  const metrics: DashboardMetrics = useMemo(() => {
    const featured = content.projects.filter((project) => project.featured !== false).length;
    return {
      projects: content.projects.length,
      featured,
      experiences: content.experiences.length,
      skills: content.skillCategories.reduce((acc, category) => acc + category.skills.length, 0),
      certifications: content.certifications.length,
      socialLinks: content.hero.socials.length,
    };
  }, [content]);

  const sectionDensityData: OverviewChartDatum[] = useMemo(
    () => [
      { name: "Projects", value: content.projects.length },
      { name: "Experiences", value: content.experiences.length },
      { name: "Skills", value: content.skillCategories.reduce((acc, category) => acc + category.skills.length, 0) },
      { name: "Certs", value: content.certifications.length },
      { name: "Workflow", value: content.contact.workflowSteps.length },
    ],
    [content]
  );

  const projectSplitData: OverviewChartDatum[] = useMemo(
    () => [
      { name: "Featured", value: metrics.featured },
      { name: "Non-featured", value: Math.max(metrics.projects - metrics.featured, 0) },
    ],
    [metrics]
  );

  return (
    <AdminDashboardOverview
      adminEmail={adminEmail}
      status={status}
      lastUploadUrl={lastUploadUrl}
      metrics={metrics}
      sectionDensityData={sectionDensityData}
      projectSplitData={projectSplitData}
    />
  );
};

export default AdminOverviewSection;
