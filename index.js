import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Path helpers for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Serve frontend HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API route for chat
app.post("/api/chat", (req, res) => {
  const userText = req.body.message.toLowerCase();
  let response = "";

  // Demo logic: if user asks for code, send code block
  if (userText.includes("html") || userText.includes("css") || userText.includes("js") || userText.includes("code") || userText.includes("game")) {
    response = "Here is your requested code:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Game</title>\n</head>\n<body>\n<h1>My Game</h1>\n</body>\n</html>\n```";
  } else {
    response = "This is Vixora AI response without code.";
  }

  res.json({ reply: response });
});

// Serve static files (if you add CSS/JS separately)
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
