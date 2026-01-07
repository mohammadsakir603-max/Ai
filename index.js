import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ================= CHAT AI ================= */
app.post("/api/chat", async (req, res) => {
  const userMsg = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMsg }]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

/* ================= IMAGE AI ================= */
app.post("/api/image", async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "512x512"
    })
  });

  const data = await response.json();
  res.json({ img: data.data[0].url });
});

/* ================= GAME AI ================= */
app.post("/api/game", async (req, res) => {
  const q = req.body.question;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a quiz game AI. Answer short." },
        { role: "user", content: q }
      ]
    })
  });

  const data = await response.json();
  res.json({ answer: data.choices[0].message.content });
});

/* ================= FRONTEND ================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ALL-IN-ONE AI</title>

<style>
body{
background:#0f0f0f;
color:#fff;
font-family:Arial;
margin:0;
padding:0;
text-align:center;
}
.container{
padding:15px;
}
input,textarea{
width:100%;
padding:12px;
border:2px solid #00ffcc;
background:#111;
color:white;
border-radius:8px;
margin-top:10px;
}
button{
margin-top:10px;
padding:12px;
width:100%;
background:transparent;
color:#00ffcc;
border:2px solid #00ffcc;
border-radius:8px;
font-size:16px;
transition:0.3s;
}
button:active{
transform:scale(0.95);
background:#00ffcc;
color:black;
}
img{
width:100%;
border-radius:10px;
margin-top:10px;
}
.box{
border:1px solid #333;
padding:10px;
margin-top:15px;
border-radius:10px;
}
</style>
</head>

<body>
<div class="container">

<h2>🤖 Chat AI</h2>
<textarea id="chatInput" placeholder="Type message"></textarea>
<button onclick="chat()">Send</button>
<div class="box" id="chatOut"></div>

<h2>🖼 Image AI</h2>
<input id="imgInput" placeholder="Image prompt">
<button onclick="image()">Generate</button>
<div id="imgOut"></div>

<h2>🎮 Game AI</h2>
<input id="gameInput" placeholder="Ask game question">
<button onclick="game()">Ask AI</button>
<div class="box" id="gameOut"></div>

</div>

<script>
async function chat(){
let msg=document.getElementById("chatInput").value;
let r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:msg})});
let d=await r.json();
document.getElementById("chatOut").innerText=d.reply;
}

async function image(){
let p=document.getElementById("imgInput").value;
let r=await fetch("/api/image",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:p})});
let d=await r.json();
document.getElementById("imgOut").innerHTML="<img src='"+d.img+"'>";
}

async function game(){
let q=document.getElementById("gameInput").value;
let r=await fetch("/api/game",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q})});
let d=await r.json();
document.getElementById("gameOut").innerText=d.answer;
}
</script>

</body>
</html>
`);
});

app.listen(PORT, () => console.log("AI App Running"));
