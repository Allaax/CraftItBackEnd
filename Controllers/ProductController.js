const mongoose = require('mongoose');
const Product = require('../Models/ProductSchema'); // Adjust the path as needed
const { bucket } = require('../firebase'); // Import the bucket from firebase.js

// Function to upload images to Firebase
const uploadImageToFirebase = async (file) => {
  const blob = bucket.file(file.name);
  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    });

    stream.end(file.data);
  });
};

exports.createProduct = async (req, res) => {
  try {
    // Ensure that both thumbnail and images are present in the request
    if (!req.files || !req.files.thumbnail || !req.files.images) {
      return res.status(400).json({ message: "Please upload the thumbnail and images." });
    }

    const thumbnailUrl = await uploadImageToFirebase(req.files.thumbnail);
    const imageUrls = await Promise.all(
      req.files.images.map((image) => uploadImageToFirebase(image))
    );

    // Create a new product with the uploaded image URLs
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      material: req.body.material,
      category: req.body.category,
      colors: req.body.colors,
      timeToBeCreated: req.body.timeToBeCreated,
      images: imageUrls, // Array of image URLs
      thumbnail: thumbnailUrl, // URL for the thumbnail
      stock: req.body.stock || 0,
      creator: req.body.creator,
      store: req.body.store,
    };

    const createdProduct = await Product.create(newProduct);

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

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params; 

    // Find products that match the category
    const products = await Product.find({ category });

    if (!products.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No products found for this category',
      });
    }

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};