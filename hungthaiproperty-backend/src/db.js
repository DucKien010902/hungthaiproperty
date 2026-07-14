import "dotenv/config";
import mongoose from "mongoose";

export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log("MongoDB connected");
}
