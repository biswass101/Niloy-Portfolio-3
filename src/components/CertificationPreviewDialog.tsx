import type { ReactNode } from "react";
import Link from "next/link";
import { Award, ExternalLink, Trophy } from "lucide-react";

import ProjectImageSlider from "@/components/ProjectImageSlider";
import type { PortfolioCertification } from "@/types/cms";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type CertificationPreviewDialogProps = {
  certification: PortfolioCertification;
  children: ReactNode;
};

const CertificationPreviewDialog = ({ certification, children }: CertificationPreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-auto max-h-[94vh] w-[98vw] max-w-[98vw] overflow-y-auto border-primary/30 bg-background/95 p-0 backdrop-blur-md sm:rounded-xl lg:h-[94vh] lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:h-full lg:grid-cols-[1.8fr_0.8fr]">
          <div className="relative min-h-[42vh] border-b border-border/50 bg-black sm:min-h-[48vh] lg:min-h-full lg:border-b-0 lg:border-r">
            <ProjectImageSlider
              images={certification.images}
              sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 66vw, 98vw"
              imageClassName="object-contain"
            />
          </div>

          <div className="flex flex-col overflow-y-auto p-5 md:p-6 lg:h-full">
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.12em] text-primary/90">{certification.period}</p>
            <DialogTitle className="mb-3 font-mono text-2xl text-foreground">{certification.title}</DialogTitle>
            <DialogDescription className="mb-4 text-sm text-primary">{certification.issuer}</DialogDescription>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{certification.details}</p>

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-primary">
                {certification.type === "award" ? <Trophy size={12} /> : <Award size={12} />}
                {certification.type}
              </span>
              <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                {certification.status === "completed" ? "Completed" : "In Progress"}
              </span>
              <span className="rounded-md border border-border/50 bg-muted/30 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                {certification.images.length} Photo{certification.images.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              {certification.credentialUrl ? (
                <Link
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-mono text-primary transition-colors hover:bg-primary/20"
                >
                  View credential
                  <ExternalLink size={13} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationPreviewDialog;
