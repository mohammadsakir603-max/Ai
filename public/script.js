const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

function send() {
  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  setTimeout(() => {
    chat.innerHTML += `<div class="msg ai">AI reply coming soon...</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 800);
}
