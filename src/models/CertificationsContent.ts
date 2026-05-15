import { Schema, model, models } from "mongoose";

const CertificationImageSchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    type: { type: String, enum: ["award", "certification"], required: true },
    status: { type: String, enum: ["completed", "in_progress"], required: true },
    details: { type: String, required: true, trim: true },
    credentialUrl: { type: String, trim: true, default: "" },
    images: { type: [CertificationImageSchema], default: [] },
  },
  { _id: false }
);

const CertificationsContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: [CertificationSchema],
      default: [],
    },
    updatedBy: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const CertificationsContentModel =
  models.CertificationsContent || model("CertificationsContent", CertificationsContentSchema);
