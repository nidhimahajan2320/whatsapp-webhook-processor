// Demo data
const chats = [
  { name: "Amit", messages: ["Hi!", "How are you?"] },
  { name: "Priya", messages: ["Hey!", "What's up?"] },
  { name: "Divya", messages: ["Hi!", "Had Dinner?"] },
  { name: "Mahi", messages: ["Hi!", "How are you?"] },
  { name: "Sakshi", messages: ["Hi!", "How are you?"] },
  { name: "Sarvi", messages: ["Hi!", "How are you?"] },
  { name: "Rutu", messages: ["Hi!", "How are you?"] },
  { name: "Ram", messages: ["Hi!", "How are you?"] },
];

const chatList = document.getElementById("chat-list");
const messagesContainer = document.getElementById("messages");
const chatUser = document.getElementById("chat-user");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

let activeChat = null;

// Load chat list
function loadChatList() {
  chatList.innerHTML = "";
  chats.forEach((chat, index) => {
    const div = document.createElement("div");
    div.classList.add("chat-item");
    div.innerText = chat.name;
    div.addEventListener("click", () => openChat(index));
    chatList.appendChild(div);
  });
}

// Open selected chat
function openChat(index) {
  activeChat = chats[index];
  chatUser.innerText = activeChat.name;
  messagesContainer.innerHTML = "";
  activeChat.messages.forEach((msg, i) => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", i % 2 === 0 ? "received" : "sent");
    msgDiv.innerText = msg;
    messagesContainer.appendChild(msgDiv);
  });
}

// Send message
sendBtn.addEventListener("click", () => {
  if (messageInput.value.trim() !== "" && activeChat) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", "sent");
    msgDiv.innerText = messageInput.value;
    messagesContainer.appendChild(msgDiv);
    activeChat.messages.push(messageInput.value);
    messageInput.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

// Init
loadChatList();