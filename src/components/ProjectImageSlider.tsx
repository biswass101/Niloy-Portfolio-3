"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type ProjectImage = {
  src: StaticImageData | string;
  alt: string;
};

type ProjectImageSliderProps = {
  images: ProjectImage[];
  className?: string;
  sizes?: string;
  imageClassName?: string;
};

const ProjectImageSlider = ({
  images,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  imageClassName,
}: ProjectImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [hasMultipleImages, images.length]);

  if (!hasImages) {
    return (
      <div className={`flex h-full items-center justify-center px-4 text-center text-xs font-mono text-muted-foreground ${className ?? ""}`}>
        Preview image coming soon
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      {images.map((image, index) => (
        <Image
          key={`${image.alt}-${index}`}
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className={`transition-all duration-700 ${
            currentIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${imageClassName ?? "object-cover"}`}
          priority={index === 0}
        />
      ))}

      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
          {images.map((_, index) => (
            <span
              key={`dot-${index}`}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageSlider;
