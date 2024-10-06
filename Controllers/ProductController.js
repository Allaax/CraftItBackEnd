const mongoose = require('mongoose');
const Product = require('../Models/ProductSchema'); // Adjust the path as needed
const StoreOwner = require('../Models/StoreOwnerSchema');
const { bucket } = require('../firebase'); // Import the bucket from firebase.js




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

exports.getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params; 

    // Find products that match the category
    const products = await Product.find({ subcategory });

    if (!products.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No products found for this subcategory',
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

