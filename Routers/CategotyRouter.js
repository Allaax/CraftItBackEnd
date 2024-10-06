const express = require('express');
const categoryController = require('../Controllers/CategoryController');
const router = express.Router();


router.get('/', categoryController.getMainCategories);
// // Route to get subcategories for a specific category
router.get('/:category/subcategories', categoryController.getSubcategories);


module.exports = router;
