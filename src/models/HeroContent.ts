import { Schema, model, models } from "mongoose";

const HeroSocialSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    iconUrl: { type: String, trim: true, default: "" },
    iconPublicId: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const HeroSchema = new Schema(
  {
    greeting: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    highlightedName: { type: String, required: true, trim: true },
    titles: [{ type: String, required: true, trim: true }],
    summary: { type: String, required: true, trim: true },
    resumeUrl: { type: String, required: true, trim: true },
    resumePublicId: { type: String, trim: true, default: "" },
    location: { type: String, required: true, trim: true },
    socials: { type: [HeroSocialSchema], default: [] },
  },
  { _id: false }
);

const HeroContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: HeroSchema,
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

export const HeroContentModel =
  models.HeroContent || model("HeroContent", HeroContentSchema);
