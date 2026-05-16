import type { ReactNode } from "react";

export const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="font-mono text-lg font-semibold">{title}</h2>
);

export const FieldGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{children}</div>
);

export const TextField = ({
  label,
  value,
  onChange,
  onUploadFile,
  isUploading = false,
  showPreview = false,
  uploadAccept,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadFile?: (file: File) => Promise<void>;
  isUploading?: boolean;
  showPreview?: boolean;
  uploadAccept?: string;
}) => (
  <label className="space-y-1">
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
    />
    {onUploadFile ? (
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex cursor-pointer items-center rounded-md border border-primary/35 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary hover:bg-primary/20">
          {isUploading ? "Uploading..." : "Upload file"}
          <input
            type="file"
            accept={uploadAccept || "image/*"}
            className="hidden"
            disabled={isUploading}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              await onUploadFile(file);
              event.target.value = "";
            }}
          />
        </span>
      </span>
    ) : null}
    {showPreview && value ? (
      <img
        src={value}
        alt={`${label} preview`}
        className="h-14 w-14 rounded-md border border-border/60 bg-card/30 object-cover"
      />
    ) : null}
  </label>
);

export const TextAreaField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <label className="space-y-1">
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-24 w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/50"
    />
  </label>
);

export const MetricCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-xl border border-border/60 bg-background/40 p-3">
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    <p className="mt-2 font-mono text-3xl font-semibold text-primary">{value}</p>
  </div>
);

export const HeaderRow = ({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-primary">{title}</h3>
    <button
      type="button"
      onClick={onAction}
      className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:bg-primary/20"
    >
      {actionLabel}
    </button>
  </div>
);

export const RowCard = ({
  children,
  onRemove,
}: {
  children: ReactNode;
  onRemove: () => void;
}) => (
  <div className="space-y-3 rounded-xl border border-border/60 bg-background/40 p-3">
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onRemove}
        className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/20"
      >
        Remove
      </button>
    </div>
    {children}
  </div>
);

export const ArrayEditor = ({
  title,
  items,
  onChange,
  addLabel,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) => (
  <div className="space-y-2">
    <HeaderRow
      title={title}
      actionLabel={addLabel}
      onAction={() => onChange([...items, "New item"])}
    />

    {items.map((item, index) => (
      <RowCard key={`array-item-${index}`} onRemove={() => onChange(items.filter((_, idx) => idx !== index))}>
        <TextField
          label={`${title} ${index + 1}`}
          value={item}
          onChange={(value) => {
            onChange(items.map((current, idx) => (idx === index ? value : current)));
          }}
        />
      </RowCard>
    ))}
  </div>
);
