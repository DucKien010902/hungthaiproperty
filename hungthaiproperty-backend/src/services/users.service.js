import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function listUsers() {
  const users = await User.find({})
    .select("-passwordHash")
    .sort({ createdAt: -1 })
    .lean();

  return { items: users };
}

export async function createUser(body = {}) {
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    throw createHttpError(400, "Vui lòng nhập đủ tên, email và mật khẩu.");
  }

  const exist = await User.findOne({ email: String(email).toLowerCase() });
  if (exist) throw createHttpError(400, "Email đã tồn tại.");

  const passwordHash = await bcrypt.hash(String(password), 10);
  const newUser = await User.create({
    name,
    email,
    passwordHash,
    role: role || "admin",
  });

  const userObj = newUser.toObject();
  delete userObj.passwordHash;
  return { item: userObj };
}

export async function updateUser(id, body = {}) {
  const { name, role, isActive, newPassword } = body;
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (role !== undefined) updateData.role = role;
  if (isActive !== undefined) updateData.isActive = isActive;
  if (newPassword) {
    updateData.passwordHash = await bcrypt.hash(String(newPassword), 10);
  }

  const item = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .select("-passwordHash")
    .lean();

  if (!item) throw createHttpError(404, "Không tìm thấy tài khoản.");
  return { item };
}

export async function deleteUser(id) {
  const item = await User.findByIdAndDelete(id).lean();
  if (!item) throw createHttpError(404, "Không tìm thấy tài khoản.");
  return { ok: true };
}
