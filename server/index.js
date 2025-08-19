import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://keeper-app-frontend-m2n9.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/notes", notesRoutes);
app.use("/api", usersRouter);

app.listen(process.env.PORT || 10000, "0.0.0.0", () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
