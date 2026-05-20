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

app.post("/api/gemini", async (req, res) => {
  try {
    const { contents } = req.body;

    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({
        error: { message: "Brak poprawnej historii czatu (contents)." },
      });
    }

    const mappedMessages = contents.map((msg) => {
      let role = msg.role;
      if (role === "model") role = "assistant";
      if (!role) role = "user";

      const textContent = msg.parts?.[0]?.text || "";

      return {
        role: role,
        content: textContent,
      };
    });

    const responseFromGroq = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: mappedMessages,
          temperature: 0.7,
        }),
      },
    );

    const data = await responseFromGroq.json();

    if (!responseFromGroq.ok) {
      console.error("Błąd z API Groq:", data);
      throw new Error(data.error?.message || "Błąd zewnętrznego API Groq");
    }

    const aiResponseText =
      data.choices?.[0]?.message?.content || "Nie otrzymałem odpowiedzi.";

    res.json({
      candidates: [
        {
          content: {
            parts: [{ text: aiResponseText }],
          },
        },
      ],
    });
  } catch (error) {
    console.error("Błąd serwera AI:", error);
    res.status(500).json({
      error: {
        message:
          error.message ||
          "Wystąpił wewnętrzny błąd serwera podczas generowania odpowiedzi.",
      },
    });
  }
});

app.listen(process.env.PORT || 5050, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 5050}`);
});
