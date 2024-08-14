// routes/chat.js (Node.js/Express route)
const express = require('express');
const ChatMessage = require('../models/ChatMessage'); // Import your ChatMessage model
const router = express.Router();

// Save a new chat message
router.post('/save', async (req, res) => {
  const { contactId, message, isSent } = req.body;

  try {
    const newMessage = new ChatMessage({
      contactId,
      message,
      isSent,
      date: new Date(),
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ message: 'Failed to save chat message' });
  }
});

// Retrieve chat messages for a specific contact
router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  try {
    const messages = await ChatMessage.find({ contactId }).sort({ date: 1 }); // Sort messages by date
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving chat messages:', error);
    res.status(500).json({ message: 'Failed to retrieve chat messages' });
  }
});

module.exports = router;
