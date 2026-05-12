import { NextResponse } from "next/server";
import { CMS_AUTH_COOKIE, verifyCmsToken, type JwtPayload } from "@/lib/auth";

export const getRequestToken = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieToken = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CMS_AUTH_COOKIE}=`))
    ?.slice(CMS_AUTH_COOKIE.length + 1);

  if (cookieToken) return decodeURIComponent(cookieToken);

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return "";
};

export const requireCmsAuth = (request: Request): { user: JwtPayload } | { response: NextResponse } => {
  const token = getRequestToken(request);

  if (!token) {
    return {
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    return {
      user: verifyCmsToken(token),
    };
  } catch {
    return {
      response: NextResponse.json({ message: "Invalid or expired token" }, { status: 401 }),
    };
  }
};
