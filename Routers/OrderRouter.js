const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

// POST route to create a new order
router.post('/', orderController.createOrder);

// GET route to fetch all orders
router.get('/', orderController.getAllOrders);

// GET route to fetch orders by store ID
router.get('/store/:storeId', orderController.getOrdersByStoreId);

// GET route to fetch a specific order by ID
router.get('/:id', orderController.getOrderById);

// PUT route to update an order
router.put('/:id', orderController.updateOrder);


// DELETE route to delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;