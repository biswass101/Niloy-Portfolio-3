import { NextResponse } from "next/server";
import { CMS_AUTH_COOKIE } from "@/lib/auth";

export const POST = async () => {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set(CMS_AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
};
