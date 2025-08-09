// Sample chat data with pre-filled messages
const chats = [
    {
        name: "Divya",
        messages: [
            { text: "Hey! How are you?", sent: false, time: "10:00 AM" },
            { text: "I'm good, what about you?", sent: true, time: "10:01 AM" }
        ]
    },
    {
        name: "Mahi",
        messages: [
            { text: "Did you complete the assignment?", sent: false, time: "9:30 AM" },
            { text: "Not yet, working on it.", sent: true, time: "9:32 AM" }
        ]
    },
    {
        name: "Sakshi",
        messages: [
            { text: "Let's meet at 5?", sent: false, time: "11:20 AM" },
            { text: "Sure, see you then!", sent: true, time: "11:21 AM" }
        ]
    },
    {
        name: "Sarvi",
        messages: [
            { text: "What's up?", sent: false, time: "Yesterday" },
            { text: "Nothing much, you?", sent: true, time: "Yesterday" }
        ]
    },
    {
        name: "Rutu",
        messages: [
            { text: "Join the call now!", sent: false, time: "5:05 PM" },
            { text: "Coming!", sent: true, time: "5:06 PM" }
        ]
    },
    {
        name: "Ram",
        messages: [
            { text: "Bhai kal ka plan?", sent: false, time: "10:00 PM" },
            { text: "Movie and dinner 😎", sent: true, time: "10:05 PM" }
        ]
    },
    {
        name: "Rushal",
        messages: [
            { text: "Kya haal hai?", sent: false, time: "3:45 PM" },
            { text: "Mast! Tu bata 😄", sent: true, time: "3:46 PM" }
        ]
    },
    {
        name: "Nidhi",
        messages: [
            { text: "Send the notes please.", sent: false, time: "1:20 PM" },
            { text: "Sure, sending now.", sent: true, time: "1:21 PM" }
        ]
    },
    {
        name: "Shreya",
        messages: [
            { text: "Meeting at 2 right?", sent: false, time: "12:50 PM" },
            { text: "Yes, don’t be late!", sent: true, time: "12:52 PM" }
        ]
    },
    {
        name: "Vaishu",
        messages: [
            { text: "Lunch ke liye aa rahe ho?", sent: false, time: "11:00 AM" },
            { text: "Yes, wait for me!", sent: true, time: "11:01 AM" }
        ]
    },
    {
        name: "Teju",
        messages: [
            { text: "Can you call me?", sent: false, time: "4:15 PM" },
            { text: "Give me 2 mins.", sent: true, time: "4:16 PM" }
        ]
    }
];

let activeChatIndex = null;

// Load chat list in sidebar
function loadChatList() {
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";
    chats.forEach((chat, index) => {
        const li = document.createElement("li");
        li.textContent = chat.name;
        li.onclick = () => openChat(index);
        chatList.appendChild(li);
    });
}

// Open selected chat
function openChat(index) {
    activeChatIndex = index;
    document.getElementById("chatName").textContent = chats[index].name;
    renderMessages();
}

// Render messages in chat window
function renderMessages() {
    const messageContainer = document.getElementById("chatMessages");
    messageContainer.innerHTML = "";

    if (activeChatIndex === null) return;

    chats[activeChatIndex].messages.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", msg.sent ? "sent" : "received");
        msgDiv.innerHTML = `
            ${msg.text}
            <div class="message-time">
                ${msg.time}${msg.sent ? '<span class="blue-tick">✔✔</span>' : ''}
            </div>
        `;
        messageContainer.appendChild(msgDiv);
    });

    // Scroll to latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Send message from input
function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (text === "" || activeChatIndex === null) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Push user's message
    chats[activeChatIndex].messages.push({ text, sent: true, time });

    renderMessages();
    input.value = "";

    // Simulate auto reply after 1s
    setTimeout(() => {
        const replyText = getAutoReply();
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        chats[activeChatIndex].messages.push({ text: replyText, sent: false, time: replyTime });
        renderMessages();
    }, 1000);
}

// Auto reply messages (demo purpose)
function getAutoReply() {
    const replies = [
        "Okay!",
        "Cool 😎",
        "I'll get back to you.",
        "Let me check...",
        "Thanks!",
        "😂😂",
        "Sure!",
        "Got it!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}

// Event listeners
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

// Initialize chat list
loadChatList();
