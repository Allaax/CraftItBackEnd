const express = require('express');
const multer = require('multer');
const productController = require('../Controllers/ProductController');

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for products
router.post('/upload-image', upload.single('file'), productController.uploadProductImage);
router.post('/create', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts );
router.get('/image/:id', productController.getImage);

module.exports = router;
