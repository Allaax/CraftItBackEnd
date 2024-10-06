const express = require('express');
const multer = require('multer');
const productController = require('../Controllers/ProductController');
const router = express.Router();

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get('/:category',productController.getProductsByCategory);
router.get('/subcategory/:subcategory',productController.getProductsBySubcategory);

router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);

// router.get('/categories/subcategory/:category/:subcategory', productController.getProductsBySubcategory);

module.exports = router;
