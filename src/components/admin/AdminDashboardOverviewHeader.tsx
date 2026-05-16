type AdminDashboardOverviewHeaderProps = {
  adminEmail: string;
  status: string;
  lastUploadUrl: string;
};

const AdminDashboardOverviewHeader = ({
  adminEmail,
  status,
  lastUploadUrl,
}: AdminDashboardOverviewHeaderProps) => (
  <div className="rounded-2xl border border-border/60 bg-card/40 p-4 md:p-5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Portfolio CMS</p>
        <h1 className="font-mono text-2xl font-semibold md:text-3xl">Visual Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Signed in as {adminEmail}</p>
      </div>
    </div>

    <div className="mt-4 rounded-md border border-border/60 bg-card/25 px-3 py-2 text-xs text-muted-foreground">
      {status}
      {lastUploadUrl ? (
        <>
          <span className="mx-2 text-border">|</span>
          Latest URL: <span className="break-all text-foreground">{lastUploadUrl}</span>
        </>
      ) : null}
    </div>
  </div>
);

export default AdminDashboardOverviewHeader;
