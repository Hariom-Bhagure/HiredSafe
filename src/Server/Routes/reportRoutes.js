const express = require('express');
const Report = require('../models/ReportScam');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../components/Config/Cloudinary');

// Middleware to parse JSON and form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
    if (!req.file) {
      return res.status(400).json({ message: 'File upload failed' });
    }
    
    const evidenceUrl = req.file.path; // The URL from Cloudinary

    // Assume you have other form data in `req.body` (like `companyName`, `description`, etc.)
    const { companyName, description } = req.body;

    // If using Mongoose to save the report
    const report = new Report({
      companyName,
      description,
      evidence: evidenceUrl,
      status: 'Pending',
    });

    await report.save();
    
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    console.error('Error occurred:', err.message || err);
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
// GET a specific report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;