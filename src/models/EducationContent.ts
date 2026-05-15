import { Schema, model, models } from "mongoose";

const EducationSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    details: [{ type: String, required: true, trim: true }],
    backgroundImageUrl: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const EducationContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: EducationSchema,
      required: true,
    },
    updatedBy: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const EducationContentModel =
  models.EducationContent || model("EducationContent", EducationContentSchema);
