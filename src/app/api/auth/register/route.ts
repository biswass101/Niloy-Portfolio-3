import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export const POST = async (request: Request) => {
  await connectDb();

  const existingUsersCount = await AdminUser.countDocuments();
  if (existingUsersCount > 0) {
    return NextResponse.json(
      { message: "Registration is disabled after first admin is created." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const email = String(body?.email || "").toLowerCase().trim();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.create({ email, passwordHash });

  return NextResponse.json({ message: "Admin user created successfully" }, { status: 201 });
};
