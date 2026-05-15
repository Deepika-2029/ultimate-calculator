import express  from "express";
import cors     from "cors";
import db       from "./db.js";

const app  = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────

// GET /api/history  →  return all entries (newest first)
app.get("/api/history", (_req, res) => {
  try {
    const rows = db.prepare(
      "SELECT id, entry, created_at FROM history ORDER BY id DESC LIMIT 100"
    ).all();
    res.json({ ok: true, history: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "DB read failed" });
  }
});

// POST /api/history  →  save one entry   body: { entry: "3 + 5 = 8" }
app.post("/api/history", (req, res) => {
  const { entry } = req.body;
  if (!entry || typeof entry !== "string") {
    return res.status(400).json({ ok: false, error: "entry is required" });
  }
  try {
    const info = db.prepare("INSERT INTO history (entry) VALUES (?)").run(entry.trim());
    res.json({ ok: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "DB write failed" });
  }
});

// DELETE /api/history  →  clear all entries
app.delete("/api/history", (_req, res) => {
  try {
    db.prepare("DELETE FROM history").run();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "DB delete failed" });
  }
});

// Health check
app.get("/api/ping", (_req, res) => res.json({ ok: true, message: "Server is alive 🚀" }));

// ── Start ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Ultimate Calc API  →  http://localhost:${PORT}`);
  console.log(`   GET    /api/history`);
  console.log(`   POST   /api/history`);
  console.log(`   DELETE /api/history`);
});
