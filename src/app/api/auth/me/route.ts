import { NextResponse } from "next/server";
import { requireCmsAuth } from "@/lib/cms-auth-guard";

export const GET = async (request: Request) => {
  const auth = requireCmsAuth(request);
  if ("response" in auth) return auth.response;

  return NextResponse.json({
    user: {
      id: auth.user.sub,
      email: auth.user.email,
    },
  });
};
