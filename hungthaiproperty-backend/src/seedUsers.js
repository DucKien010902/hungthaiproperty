import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import User from "./models/User.model.js";

async function run() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@hungthaiproperty.vn";
  const password = process.env.ADMIN_PASSWORD || "hungthaiproperty";
  const passwordHash = await bcrypt.hash(password, 10);

  await User.updateOne(
    { email },
    {
      $set: {
        name: process.env.ADMIN_NAME || "Admin Nam Sơn",
        email,
        passwordHash,
        role: "super_admin",
        isActive: true,
      },
    },
    { upsert: true },
  );

  console.log(`Đã tạo/cập nhật tài khoản admin: ${email}`);
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
