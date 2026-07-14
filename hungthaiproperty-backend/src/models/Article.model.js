import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    content: { type: String, default: "" },
    src: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false },
);

const ArticleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, default: "", trim: true },
    excerpt: { type: String, default: "" },
    date: { type: String, default: "", trim: true },
    href: { type: String, default: "#", trim: true },
    contentBlocks: { type: [ContentBlockSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Article", ArticleSchema);
