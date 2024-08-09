const express = require('express');
const Report = require('../models/ReportScam');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../components/Config/Cloudinary');

// Configure multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'evidence', // The folder in your Cloudinary account where images will be stored
    format: async (req, file) => 'png', // Format of the uploaded files
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage: storage });

// POST request to submit a scam report
router.post('/', upload.single('evidence'), async (req, res) => {
  try {
    const { companyName, companyAddress, industry, dateOfScam, description, reporterName, reporterEmail } = req.body;
    const evidence = req.file ? req.file.path : ''; // Get the Cloudinary URL of the uploaded file

    const report = new Report({
      companyName,
      companyAddress,
      industry,
      dateOfScam,
      description,
      evidence,
      reporterName,
      reporterEmail,
      status: 'Pending' // Default status when creating a new report
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Verify report
router.put('/:id/verify', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = 'Verified';
    await report.save();
    res.json({ message: 'Report verified' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Publish report
router.put('/:id/publish', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = 'Published';
    await report.save();
    res.json({ message: 'Report published' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



module.exports = router;
