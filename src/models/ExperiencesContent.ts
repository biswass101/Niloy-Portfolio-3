import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    highlights: [{ type: String, required: true, trim: true }],
    tech: [{ type: String, required: true, trim: true }],
  },
  { _id: false }
);

const ExperiencesContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: [ExperienceSchema],
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

export const ExperiencesContentModel =
  models.ExperiencesContent || model("ExperiencesContent", ExperiencesContentSchema);
