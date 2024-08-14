const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');

// @route   POST /api/contact
// @desc    Save contact details
// @access  Public
router.post('/', (req, res) => {
  const newContact = new Contact(req.body);

  newContact.save()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Assuming Contact is your MongoDB model
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
