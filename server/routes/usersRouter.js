import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  exportUser,
} from "../controllers/usersController.js";
import verifyToken from "../middleware/verifyToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

// GDPR Art. 17 — Right to erasure
usersRouter.delete("/account", verifyToken, deleteUser);

// GDPR Art. 20 — Right to data portability
usersRouter.get("/account/export", verifyToken, exportUser);

export default usersRouter;
