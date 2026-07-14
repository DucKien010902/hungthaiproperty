import express from "express";
import {
  addArticleBlock,
  createArticle,
  deleteArticle,
  deleteArticleBlock,
  getArticle,
  listArticles,
  updateArticle,
  updateArticleBlock,
} from "../controllers/articles.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();
const requireAdmin = [requireAuth, requireRole("super_admin", "admin")];

router.get("/", listArticles);
router.get("/:id", getArticle);
router.post("/", ...requireAdmin, createArticle);
router.patch("/:id", ...requireAdmin, updateArticle);
router.delete("/:id", ...requireAdmin, deleteArticle);

router.post("/:id/blocks", ...requireAdmin, addArticleBlock);
router.patch("/:id/blocks/:blockIndex", ...requireAdmin, updateArticleBlock);
router.delete("/:id/blocks/:blockIndex", ...requireAdmin, deleteArticleBlock);

export default router;
