const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../../src/components/Config/Cloudinary');
const Blog = require('../models/BlogModel');
const router = express.Router();

// Set up Cloudinary storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'evidence', // Folder in Cloudinary where files will be stored
    format: async (req, file) => 'jpg', // Format of the uploaded files
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// @route   POST /api/blogs
// @desc    Save blog details to the database and upload file to Cloudinary
// @access  Public
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { name, email, companyName, title, description } = req.body;
    const newBlog = new Blog({
      name,
      email,
      companyName,
      title,
      description,
      fileUrl: req.file ? req.file.path : null, // Cloudinary URL
    });

    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    console.error('Error saving blog:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
module.exports = router;
