const express = require('express');
const { createProduct } = require('../Controllers/ProductController');
const multer = require('multer');

const router = express.Router();

// Multer configuration to handle multiple file fields
const storage = multer.memoryStorage(); 
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

router.post('/create', upload.fields([
  { name: 'thumbnail', maxCount: 1 },  // Single thumbnail
  { name: 'images', maxCount: 5 }      // Up to 5 images
]), createProduct);

module.exports = router;
