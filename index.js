<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vixora AI</title>
<style>
*{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto}
body{margin:0;background:#f6f7fb;display:flex;flex-direction:column;height:100vh;}
header{text-align:center;padding:18px;font-size:20px;font-weight:600;}
#chat{flex:1;overflow-y:auto;padding:15px;}
.msg{max-width:85%;margin-bottom:12px;padding:12px 14px;border-radius:16px;font-size:15px;line-height:1.4;}
.user{background:#111;color:#fff;margin-left:auto;border-bottom-right-radius:4px;}
.bot{background:#fff;color:#000;border-bottom-left-radius:4px;}
pre{background:#0f172a;color:#e5e7eb;padding:12px;border-radius:12px;overflow-x:auto;position:relative;}
.copy-btn{position:absolute;top:8px;right:8px;background:#fff;color:#000;border:none;padding:5px 8px;border-radius:6px;font-size:12px;cursor:pointer;}
footer{display:flex;gap:8px;padding:12px;background:#fff;}
input{flex:1;padding:14px;border-radius:14px;border:1px solid #ddd;font-size:15px;}
button{border:none;border-radius:50%;width:48px;height:48px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;}
button:active{transform:scale(.9)}
#send{background:#000;color:#fff;}
</style>
</head>
<body>

<header>What can I help you with?</header>

<div id="chat"></div>

<footer>
  <input id="input" placeholder="Ask with Vixora">
  <button id="send">➤</button>
</footer>

<script>
const chat=document.getElementById("chat");
const input=document.getElementById("input");

function addMsg(text,cls){
  const div=document.createElement("div");
  div.className="msg "+cls;

  if(text.includes("```")){
    // Code block ke liye copy button
    const code=text.split("```")[1];
    const pre=document.createElement("pre");
    pre.innerHTML=`<button class="copy-btn">Copy</button><code>${code}</code>`;
    div.appendChild(pre);
    setTimeout(()=>{
      pre.querySelector(".copy-btn").onclick=()=>{
        navigator.clipboard.writeText(code);
        pre.querySelector(".copy-btn").innerText="Copied";
      };
    });
  } else {
    // Normal text, copy button nahi
    div.innerText=text;
  }

  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
}

document.getElementById("send").onclick=()=>{
  if(!input.value.trim()) return;
  addMsg(input.value,"user");

  // Demo AI response logic
  setTimeout(()=>{
    let userText=input.value.toLowerCase();
    if(userText.includes("html")||userText.includes("css")||userText.includes("js")||userText.includes("code")||userText.includes("game")){
      addMsg("Here is your requested code:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Game</title>\n</head>\n<body>\n<h1>My Game</h1>\n</body>\n</html>\n```","bot");
    } else {
      addMsg("This is Vixora AI response without code.","bot");
    }
  },600);
  input.value="";
};
</script>

</body>
</html>
