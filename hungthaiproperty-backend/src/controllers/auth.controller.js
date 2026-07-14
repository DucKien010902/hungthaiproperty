import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

function createToken(user) {
  return jwt.sign(
    {
      sub: String(user._id),
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: String(email || "").toLowerCase() });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Tài khoản không hợp lệ." });
    }

    const isValidPassword = await bcrypt.compare(
      String(password || ""),
      user.passwordHash,
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }

    const userObj = user.toObject();
    delete userObj.passwordHash;

    return res.json({
      token: createToken(user),
      user: userObj,
    });
  } catch (error) {
    return next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash").lean();
    if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
}
