// Mainserver.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./Routes/reportRoutes');

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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
