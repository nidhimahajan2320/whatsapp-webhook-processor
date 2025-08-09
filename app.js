// app.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Root path test
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Webhook GET - for verification (Facebook/WhatsApp setup)
app.get("/webhook", (req, res) => {
  const verify_token = "my_verify_token"; // <-- Set your verify token

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
      console.log("Webhook verified");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// Webhook POST - for receiving messages
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object) {
    console.log("Incoming webhook:");
    console.dir(body, { depth: null });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`n);
});
const path = require("path"); // already ho sakta hai

// Static files serve karne ke liye
app.use(express.static(path.join(__dirname, "frontend")));