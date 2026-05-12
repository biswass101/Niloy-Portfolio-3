import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { CMS_AUTH_COOKIE, signCmsToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

export const POST = async (request: Request) => {
  await connectDb();

  const body = await request.json();
  const email = String(body?.email || "").toLowerCase().trim();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const user = await AdminUser.findOne({ email }).lean();
  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const token = signCmsToken({
    sub: String(user._id),
    email: user.email,
  });

  const response = NextResponse.json({
    message: "Login successful",
    user: {
      email: user.email,
    },
  });

  response.cookies.set(CMS_AUTH_COOKIE, token, buildCookieOptions());
  return response;
};
