import express from "express";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", listUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
