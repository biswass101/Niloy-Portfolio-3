import { NextResponse } from "next/server";
import { requireCmsAuth } from "@/lib/cms-auth-guard";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const POST = async (request: Request) => {
  const auth = requireCmsAuth(request);
  if ("response" in auth) return auth.response;

  let payload: { publicId?: string; resourceType?: "image" | "raw" };

  try {
    payload = (await request.json()) as { publicId?: string; resourceType?: "image" | "raw" };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload?.publicId) {
    return NextResponse.json({ message: "publicId is required" }, { status: 400 });
  }

  const resourceType = payload.resourceType === "raw" ? "raw" : "image";

  try {
    const result = await deleteFromCloudinary(payload.publicId, resourceType);
    return NextResponse.json({ message: "Delete successful", result });
  } catch {
    return NextResponse.json(
      { message: "Delete failed. Check Cloudinary credentials." },
      { status: 500 }
    );
  }
};
