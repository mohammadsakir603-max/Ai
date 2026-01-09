import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;
const API_KEY = process.env.OPENAI_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
  try {
    const userText = req.body.message;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Vixora AI. Talk naturally like a human. " +
              "If the user asks for code, respond ONLY with code. " +
              "Do not say phrases like 'response without code'."
          },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await aiRes.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (e) {
    res.json({ reply: "Something went wrong. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
