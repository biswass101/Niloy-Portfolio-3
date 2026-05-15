import { Schema, model, models } from "mongoose";

const SkillCategorySchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    skills: [{ type: String, required: true, trim: true }],
  },
  { _id: false }
);

const SkillCategoriesContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: [SkillCategorySchema],
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

export const SkillCategoriesContentModel =
  models.SkillCategoriesContent || model("SkillCategoriesContent", SkillCategoriesContentSchema);
