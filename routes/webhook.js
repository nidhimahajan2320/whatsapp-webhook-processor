const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/webhook", async (req, res) => {
  try {
    const { from, message, timestamp } = req.body;
    const newMessage = new Message({ from, message, timestamp });
    await newMessage.save();
    res.status(200).send("Message saved");
  } catch (error) {
    res.status(500).send("Error saving message");
  }
});

module.exports = router;
