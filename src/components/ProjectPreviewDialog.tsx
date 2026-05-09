import type { ReactNode } from "react";
import { ExternalLink, Github } from "lucide-react";

import type { Project } from "@/data/projects";
import ProjectImageSlider from "@/components/ProjectImageSlider";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ProjectPreviewDialogProps = {
  project: Project;
  children: ReactNode;
};

const ProjectPreviewDialog = ({ project, children }: ProjectPreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[94vh] w-[98vw] max-w-[98vw] overflow-hidden border-primary/30 bg-background/95 p-0 backdrop-blur-md sm:rounded-xl">
        <div className="grid h-full grid-cols-1 lg:grid-cols-[1.9fr_0.7fr]">
          <div className="relative min-h-[48vh] border-b border-border/50 bg-muted/20 lg:min-h-full lg:border-b-0 lg:border-r">
            <ProjectImageSlider
              images={project.images}
              sizes="(min-width: 1280px) 72vw, (min-width: 1024px) 68vw, 98vw"
              imageClassName="object-contain"
              className="bg-black"
            />
          </div>

          <div className="flex h-full flex-col overflow-y-auto p-5 md:p-6">
            <p className="mb-3 text-xs font-mono text-primary/90">{project.year}</p>
            <DialogTitle className="mb-3 font-mono text-2xl text-foreground">{project.title}</DialogTitle>
            <DialogDescription className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </DialogDescription>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-xs font-mono text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github size={14} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-mono text-primary transition-colors hover:bg-primary/20"
                >
                  <ExternalLink size={14} />
                  Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreviewDialog;
