import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema(
  {
    locationTitle: { type: String, required: true, trim: true },
    coordinates: { type: String, required: true, trim: true },
    timezone: { type: String, required: true, trim: true },
    brief: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    growth: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    craft: { type: String, required: true, trim: true },
    mapImageUrl: { type: String, trim: true, default: "" },
    mapImagePublicId: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const AboutContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: AboutSchema,
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

export const AboutContentModel =
  models.AboutContent || model("AboutContent", AboutContentSchema);
