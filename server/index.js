import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

import notesRoutes from "./routes/notesRoutes.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();

// inicjalizacja Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());

app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api", usersRouter);

app.post("/api/gemini", async (req, res) => {
  try {
    const { contents } = req.body;

    if (!contents) {
      return res.status(400).json({
        error: {
          message: "Brak historii czatu.",
        },
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent({ contents });

    const response = await result.response;

    const text = response.text();

    res.json({
      candidates: [
        {
          content: {
            parts: [{ text }],
          },
        },
      ],
    });
  } catch (error) {
    console.error("Błąd Gemini:", error);

    res.status(500).json({
      error: {
        message: "Nie udało się wygenerować odpowiedzi.",
      },
    });
  }
});

app.listen(process.env.PORT || 5050, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 5050}`);
});
