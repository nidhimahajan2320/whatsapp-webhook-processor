// processpayloads.js

const mongoose = require('mongoose');

// MongoDB ke liye schema banate hain
const messageSchema = new mongoose.Schema({
  from: String,
  id: String,
  timestamp: String,
  text: String,
  type: String,
});

// Model banate hain
const Message = mongoose.model('Message', messageSchema);

// Payload process karne ka function
async function processPayload(payload) {
  try {
    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];

    if (message) {
      const newMessage = new Message({
        from: message.from,
        id: message.id,
        timestamp: message.timestamp,
        text: message.text?.body || '',
        type: message.type,
      });

      await newMessage.save();
      console.log(" Message saved to MongoDB");
    } else {
      console.log(" No message found in payload");
    }
  } catch (error) {
    console.error(" Error processing payload:", error);
  }
}

module.exports = processPayload;