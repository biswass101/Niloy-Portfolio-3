import { NextResponse } from "next/server";
import { requireCmsAuth } from "@/lib/cms-auth-guard";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const POST = async (request: Request) => {
  const auth = requireCmsAuth(request);
  if ("response" in auth) return auth.response;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File is required" }, { status: 400 });
  }

  const folder = (formData.get("folder") as string) || "portfolio-cms";
  const requestedResourceType = formData.get("resourceType");
  const resourceType = requestedResourceType === "raw" ? "raw" : "image";

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await uploadToCloudinary(buffer, folder, resourceType);

    return NextResponse.json({
      message: "Upload successful",
      url: uploaded.secureUrl,
      publicId: uploaded.publicId,
    });
  } catch {
    return NextResponse.json(
      { message: "Upload failed. Check Cloudinary credentials." },
      { status: 500 }
    );
  }
};
