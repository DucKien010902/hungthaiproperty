import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
