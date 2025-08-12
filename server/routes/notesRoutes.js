import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getNotes);
router.post("/", verifyToken, createNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
