import pool from "../db.js";

const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO notes (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW())",
      [userId, title, content]
    );
    res.status(201).json({ message: "Note added" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
};

const deleteNote = async (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id=$1 AND user_id = $2",
      [noteId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};

const editNote = async (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, noteId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Note update error:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

export { getNotes, createNote, deleteNote, editNote };
