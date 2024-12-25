const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// データベース接続設定
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// データベース初期化（スキーマ作成）
pool.query(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (err) => {
    if (err) {
      console.error("Failed to initialize database schema:", err.message);
    } else {
      console.log("Database schema initialized.");
    }
  }
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 全タスク一覧（当日以降）
app.get("/tasks", (req, res) => {
  pool.query(
    "SELECT * FROM tasks WHERE due_date >= CURRENT_DATE ORDER BY due_date ASC",
    (err, result) => {
      if (err) {
        console.error("Failed to fetch tasks:", err.message);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(result.rows);
      }
    }
  );
});

// ユーザーごとのタスク一覧
app.get("/tasks/:user_id", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  pool.query(
    "SELECT * FROM tasks WHERE user_id = $1 AND due_date >= CURRENT_DATE ORDER BY due_date ASC",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Failed to fetch tasks:", err.message);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(result.rows);
      }
    }
  );
});

// タスク登録API
app.post("/tasks", (req, res) => {
  const { user_id, title, description, due_date } = req.body;
  if (!user_id || !title) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  pool.query(
    "INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, description, due_date],
    (err, result) => {
      if (err) {
        console.error("Failed to insert task:", err.message);
        res.status(500).json({ error: "Failed to add task" });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

