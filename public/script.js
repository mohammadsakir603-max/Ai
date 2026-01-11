const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

let typingDiv = null;
let loading = false;

function addMessage(text,type){
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping(){
  removeTyping();
  typingDiv = document.createElement("div");
  typingDiv.className = "typing ai";
  typingDiv.innerHTML = `
    <div class="dots">
      <span>●</span><span>●</span><span>●</span>
    </div>`;
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping(){
  if(typingDiv){
    typingDiv.remove();
    typingDiv = null;
  }
}

async function send(){
  if(loading) return;

  const text = input.value.trim();
  if(!text) return;

  addMessage(text,"user");
  input.value = "";

  loading = true;
  sendBtn.classList.add("loading");
  showTyping();

  try{
    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:text})
    });

    const data = await res.json();
    removeTyping();

    addMessage(data.reply,"ai");

  }catch{
    removeTyping();
    addMessage("Server error","ai");
  }

  loading = false;
  sendBtn.classList.remove("loading");
}
