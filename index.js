import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON middleware
app.use(express.json());

// Static public folder
app.use(express.static(path.join(__dirname, "public")));

// API route
app.post("/api/chat", (req, res) => {
  const userText = req.body.message || "";

  res.json({
    reply: "AI reply coming soon..."
  });
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
