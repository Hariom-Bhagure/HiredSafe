// routes/email.js (Node.js/Express route)
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  // Create a transporter object with SMTP server details
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hariombhagure@gmail.com', // Admin's email
      pass: 'cbhhfscgwevwbtuz', // Admin's email password
    },
  });

  // Define email options
  let mailOptions = {
    from: 'hariombhagure@gmail.com', // Admin's email
    to: recipientEmail,
    subject: subject || 'Message from Hired Safe Support',
    text: message,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
