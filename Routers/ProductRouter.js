const express = require('express');
const multer = require('multer');
const productController = require('../Controllers/ProductController');

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);
router.get('/category/:category',productController.getProductsByCategory);
router.post('/',productController.createProduct);


module.exports = router;
