// models/ChatMessage.js
const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Contact',
  },
  message: {
    type: String,
    required: true,
  },
  isSent: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
