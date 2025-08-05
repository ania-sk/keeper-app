import pool from "../db.js";

const getNotes = async (req, res) => {
  const result = await pool.query("SELECT * FROM notes");
  res.jason(result.rows);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  await pool.query(
    "INSERT INTO notes (title, content, created_at) VALUES ($1, $2, NOW())",
    [title, content]
  );

  res.status(201).json({ message: "Notes added" });
};

export { getNotes, createNote };
