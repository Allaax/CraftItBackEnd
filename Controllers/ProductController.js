const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const crypto = require('crypto');
const path = require('path');
const Product = require('../Models/ProductSchema');

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Upload multiple product images
exports.uploadProductImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const imageIds = []; // Array to store uploaded image file IDs

  req.files.forEach((file) => {
    const fileName = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);

    const uploadStream = gfs.openUploadStream(fileName);
    uploadStream.end(file.buffer);  // File data from Multer

    uploadStream.on('finish', (uploadedFile) => {
      imageIds.push(uploadedFile._id);

      // Check if all files have been uploaded
      if (imageIds.length === req.files.length) {
        res.status(200).json({
          message: 'Files uploaded successfully',
          imageIds: imageIds
        });
      }
    });
  });
};

// Create product with uploaded image IDs
exports.createProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    // Check if images are uploaded
    let images = [];
    if (req.files) {
      images = req.files.map(file => file._id);
    }

    const productToCreate = { ...newProduct, images };  // Add image IDs to product

    const createdProduct = await Product.create(productToCreate);

    res.status(201).json({
      status: 'success',
      message: 'Product has been created!',
      data: {
        product: createdProduct,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

