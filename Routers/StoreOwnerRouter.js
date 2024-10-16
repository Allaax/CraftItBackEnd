const express = require('express');
const multer = require('multer');
const storeOwnerRouter = require('../Controllers/StoreOwnerController');

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.memoryStorage();

router.get('/', storeOwnerRouter.getAllStores);
router.post('/:userId/product', storeOwnerRouter.createProduct);
router.get('/:id', storeOwnerRouter.getStoreOwnerById);
router.put('/:userId', storeOwnerRouter.updateStoreInfo);


module.exports = router;
