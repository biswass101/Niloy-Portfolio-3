import { NextResponse } from "next/server";
import { getAdminPortfolioContent, savePortfolioContent } from "@/lib/cms-store";
import { requireCmsAuth } from "@/lib/cms-auth-guard";
import type { PortfolioContent } from "@/types/cms";

export const GET = async (request: Request) => {
  const auth = requireCmsAuth(request);
  if ("response" in auth) return auth.response;

  const content = await getAdminPortfolioContent();
  return NextResponse.json(content);
};

export const PUT = async (request: Request) => {
  const auth = requireCmsAuth(request);
  if ("response" in auth) return auth.response;

  let payload: PortfolioContent;

  try {
    payload = (await request.json()) as PortfolioContent;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Content payload is required" }, { status: 400 });
  }

  let updated: PortfolioContent;
  try {
    updated = await savePortfolioContent(payload, auth.user.email);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to validate and save content";
    return NextResponse.json({ message }, { status: 400 });
  }

  return NextResponse.json({
    message: "Portfolio content updated successfully",
    content: updated,
  });
};
