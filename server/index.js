import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRoutes);
app.use("/api", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
