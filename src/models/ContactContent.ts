import { Schema, model, models } from "mongoose";

const WorkflowStepSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ContactMethodSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    iconUrl: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    intro: { type: String, required: true, trim: true },
    workflowSteps: { type: [WorkflowStepSchema], default: [] },
    contacts: { type: [ContactMethodSchema], default: [] },
  },
  { _id: false }
);

const ContactContentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
      trim: true,
    },
    content: {
      type: ContactSchema,
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

export const ContactContentModel =
  models.ContactContent || model("ContactContent", ContactContentSchema);
