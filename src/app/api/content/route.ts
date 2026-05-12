import { NextResponse } from "next/server";
import { getPublicPortfolioContent } from "@/lib/cms-store";

export const GET = async () => {
  const content = await getPublicPortfolioContent();
  return NextResponse.json(content);
};
