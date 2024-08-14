// Mainserver.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./Routes/reportRoutes');
const adminRoutes = require("./Routes/AdminLoginRoute");
const contactRoutes =require("./Routes/contact")
const blogs = require('./Routes/blogs');
const emailRoutes = require('./Routes/nodemailer'); // Assuming email.js is in the routes folder
const chatRoutes = require('./Routes/chat');




const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI
const MONGODB_URI = 'mongodb+srv://hariom_bhagure:hariom9997@cluster0.pqxnled.mongodb.net/';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug: Log MongoDB URI
console.log('MongoDB URI:', MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 30000, })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact',contactRoutes );
app.use('/api/blogs', blogs);
app.use('/api/email', emailRoutes);
app.use('/api/chat', chatRoutes);





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
