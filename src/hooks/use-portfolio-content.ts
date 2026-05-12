"use client";

import { useEffect, useState } from "react";
import { defaultPortfolioContent } from "@/data/defaultCmsContent";
import type { PortfolioContent } from "@/types/cms";

export const usePortfolioContent = () => {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as PortfolioContent;
        if (!mounted) return;

        setContent(data);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    content,
    isLoading,
  };
};
