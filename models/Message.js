const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  msg_id: { type: String, unique: true, required: true },
  wa_id: String,
  name: String,
  number: String,
  message: String,
  timestamp: Date,
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
});

module.exports = mongoose.model('Message', MessageSchema);