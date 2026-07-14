import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db.js";
import articleRoutes from "./routes/articles.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import userRoutes from "./routes/users.routes.js";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5002;

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "namsonland-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", requireAuth, userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy API." });
});

app.use((err, req, res, next) => {
  if (err?.code === 11000) {
    return res.status(400).json({ message: "Dữ liệu đã tồn tại." });
  }

  console.error(err);
  return res.status(err?.status || 500).json({
    message: err?.message || "Lỗi máy chủ.",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Nam Sơn Land API đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Không thể kết nối MongoDB:", error);
    process.exit(1);
  });
