import express from "express";
import {
  addProjectImage,
  createProject,
  deleteProject,
  deleteProjectImage,
  getProject,
  listProjects,
  updateProject,
  updateProjectImage,
} from "../controllers/projects.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();
const requireAdmin = [requireAuth, requireRole("super_admin", "admin")];

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", ...requireAdmin, createProject);
router.patch("/:id", ...requireAdmin, updateProject);
router.delete("/:id", ...requireAdmin, deleteProject);

router.post("/:id/images", ...requireAdmin, addProjectImage);
router.patch("/:id/images/:imageIndex", ...requireAdmin, updateProjectImage);
router.delete("/:id/images/:imageIndex", ...requireAdmin, deleteProjectImage);

export default router;
