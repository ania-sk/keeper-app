import express from "express";
import { registerUser } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/", registerUser);

export default usersRouter;
