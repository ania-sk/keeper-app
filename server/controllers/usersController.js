import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Incorrect data" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertResult = await pool.query(
      "INSERT INTO users (email, password_hash, user_name) VALUES ($1, $2, $3) RETURNING id, email, user_name",
      [email, passwordHash, username],
    );

    const user = insertResult.rows[0];

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, user_name: user.user_name },
      JWT_SECRET,
      { expiresIn: "4h" },
    );

    res
      .status(201)
      .json({ message: "Registration completed successfully", accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, user_name: user.user_name },
      JWT_SECRET,
      { expiresIn: "4h" },
    );

    return res.status(200).json({ message: "Login successful!", accessToken });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login." });
  }
}

// GDPR Art. 17 — Right to erasure
async function deleteUser(req, res) {
  const userId = req.user.id;

  try {
    // notes are deleted automatically via ON DELETE CASCADE
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Account and all associated data deleted successfully",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    return res
      .status(500)
      .json({ error: "Server error during account deletion." });
  }
}

// GDPR Art. 20 — Right to data portability
async function exportUser(req, res) {
  const userId = req.user.id;

  try {
    const userResult = await pool.query(
      "SELECT id, email, user_name, created_at FROM users WHERE id = $1",
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const notesResult = await pool.query(
      "SELECT id, title, content, created_at FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );

    const exportData = {
      exported_at: new Date().toISOString(),
      gdpr_notice:
        "This export contains all personal data stored by Keeper App for your account.",
      account: userResult.rows[0],
      notes: notesResult.rows,
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="keeper-data-export-${userId}.json"`,
    );

    return res.status(200).json(exportData);
  } catch (err) {
    console.error("Export user error:", err);
    return res.status(500).json({ error: "Server error during data export." });
  }
}

export { registerUser, loginUser, deleteUser, exportUser };
