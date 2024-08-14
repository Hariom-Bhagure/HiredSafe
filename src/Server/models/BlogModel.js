const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String }, // This will store the filename of the uploaded file
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
