import { Schema, model, models } from "mongoose";

const ProjectImageSchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech: [{ type: String, required: true, trim: true }],
    live: { type: String, trim: true, default: "" },
    github: { type: String, trim: true, default: "" },
    year: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: true },
    images: { type: [ProjectImageSchema], default: [] },
  },
  { _id: false }
);

const ProjectsContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: [ProjectSchema],
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

export const ProjectsContentModel =
  models.ProjectsContent || model("ProjectsContent", ProjectsContentSchema);
