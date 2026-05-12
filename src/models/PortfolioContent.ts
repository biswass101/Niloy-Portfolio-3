import { Schema, model, models } from "mongoose";

const PortfolioContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    updatedBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PortfolioContentModel =
  models.PortfolioContent || model("PortfolioContent", PortfolioContentSchema);
