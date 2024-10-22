const express = require('express');
const customerRouter = require('../Controllers/CustomerController');

const router = express.Router();

router.get('/:userId',customerRouter.getCustomerByUserId);
router.post('/cart/:userId', customerRouter.addToCart);
router.get('/cart/:userId', customerRouter.getCart);
router.put('/cart/:userId', customerRouter.updateCartItemQuantity); 
router.delete('/cart/:userId', customerRouter.removeFromCart); 



module.exports = router;
