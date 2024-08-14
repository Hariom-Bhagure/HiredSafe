const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminloginModal');

const router = express.Router();
// Admin login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    // If credentials are correct
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
