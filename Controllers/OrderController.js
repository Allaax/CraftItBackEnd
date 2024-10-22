const Order = require('../Models/OrderSchema');
const Product = require('../Models/ProductSchema');



exports.createOrder = async (req, res) => {
  try {
    // Check if customer and store are provided
    if (!req.body.customer || !req.body.store) {
      return res.status(400).json({ error: 'Customer and store are required' });
    }

    console.log("Customer ID:", req.body.customer); // Log customer ID for debugging

    const productsWithImages = await Promise.all(req.body.products.map(async (item) => {
      const product = await Product.findById(item.product);

      if (!product) {
        console.log(`Product with ID ${item.product} not found.`);
        return null; // or handle this case appropriately
      }

      console.log("Product fetched:", product); // Log product details for debugging

      return {
        product: product._id,
        quantity: item.quantity,
        image: product.images ? product.images[0] : null, // Assuming you want the first image
      };
    }));

    // Filter out any null products if not found
    const validProducts = productsWithImages.filter(item => item !== null);

    console.log("productsWithImages:", validProducts);

    const order = new Order({
      customer: req.body.customer,
      store: req.body.store,
      products: validProducts,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    });
    
    console.log("Order to be saved:", order);

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'user_name email')
      .populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByStoreId = async (req, res) => {
  const { storeId } = req.params;

  try {
    const orders = await Order.find({ store: storeId })
      .populate('customer', 'user_name email')
      .populate('products.product');

    if (orders.length > 0) {
      return res.status(200).json(orders);
    } else {
      return res.status(404).json({ message: 'No orders found for this store.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate('customer', 'user_name email')
      .populate('products.product');

    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (deletedOrder) {
      return res.status(200).json({ message: 'Order deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
