const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  industry: { type: String, required: true },
  dateOfScam: { type: Date, required: true },
  description: { type: String, required: true },
  evidence: { type: String },
  reporterName: { type: String, required: true },
  reporterEmail: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Verified', 'Published'], default: 'Pending' } // Add the status field here
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
