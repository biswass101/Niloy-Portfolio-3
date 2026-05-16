import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type OverviewChartDatum = { name: string; value: number };

type AdminDashboardOverviewChartsProps = {
  sectionDensityData: OverviewChartDatum[];
  projectSplitData: OverviewChartDatum[];
};

const AdminDashboardOverviewCharts = ({
  sectionDensityData,
  projectSplitData,
}: AdminDashboardOverviewChartsProps) => (
  <div className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary">Section Density</p>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sectionDensityData}>
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: "hsl(var(--primary) / 0.08)" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary">Project Mix</p>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={projectSplitData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={90}>
              {projectSplitData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === "Featured" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AdminDashboardOverviewCharts;
