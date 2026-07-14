import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    href: { type: String, default: "#", trim: true },
    developer: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    totalArea: { type: String, default: "", trim: true },
    scale: { type: String, default: "", trim: true },
    apartmentCount: { type: String, default: "", trim: true },
    startDate: { type: String, default: "", trim: true },
    businessDeveloper: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Project", ProjectSchema);
