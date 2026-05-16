import { v2 as cloudinary } from "cloudinary";

let configured = false;

const ensureCloudinary = () => {
  if (configured) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
};

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder = "portfolio-cms",
  resourceType: "image" | "raw" = "image"
): Promise<{ secureUrl: string; publicId: string }> => {
  ensureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<{ result: string }> => {
  ensureCloudinary();

  const response = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });

  return { result: response.result };
};
