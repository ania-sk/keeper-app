import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import notesRoutes from "./routes/notesRoutes.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent({ contents: contents });
const response = await result.response;
const text = response.text();

app.use(cors());
// app.use(
//   cors({
//     origin: "https://keeper-app-frontend-m2n9.onrender.com",
//     credentials: true,
//   })
// );
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api", usersRouter);

app.post("/api/gemini", async (req, res) => {
  try {
    const { contents } = req.body;

    if (!contents) {
      return res
        .status(400)
        .json({ error: { message: "Brak historii czatu." } });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: contents,
    });

    res.json({
      candidates: [
        {
          content: {
            parts: [{ text: response.text }],
          },
        },
      ],
    });
  } catch (error) {
    console.error("Błąd bota Gemini na backendzie:", error);
    res.status(500).json({
      error: { message: "Nie udało się wygenerować odpowiedzi bota." },
    });
  }
});

app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
