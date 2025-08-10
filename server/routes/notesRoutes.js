import express from "express";
import { getNotes, createNote } from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getNotes);
router.post("/", createNote);

export default router;
