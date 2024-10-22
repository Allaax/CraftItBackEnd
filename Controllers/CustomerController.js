const Customer = require('../Models/CustomerSchema');

// Create customer profile

// Get customer details

exports.getCustomerByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters

    // Find the customer by user ID
    const customer = await Customer.findOne({ user: userId })
      .populate('user') // Optional: populate the user details if needed
      .populate('cart.productId') // Optional: populate product details in the cart
      .populate('orders'); // Optional: populate order details

    if (!customer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        customer,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;  // Assuming userId is passed as a route parameter
    const { productId, quantity } = req.body;

    // Find the customer by user ID
    const customer = await Customer.findOne({ user: userId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the product in the cart
    const cartItem = customer.cart.find(item => item.productId.toString() === productId);

    if (cartItem) {
      // Update the quantity if the product is already in the cart
      cartItem.quantity += quantity;
    } else {
      // Otherwise, add a new item to the cart
      customer.cart.push({ productId, quantity });
    }

    // Save the updated customer
    await customer.save();

    res.status(200).json({
      status: 'success',
      message: 'Product added to cart successfully!',
      data: { cart: customer.cart }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the customer by user ID and populate the cart with product details
    const customer = await Customer.findOne({ user: userId })
      .populate({
        path: 'cart.productId',
        model: 'Product',  // Assuming your Product model is named 'Product'
        // Select all fields from the Product model
        select: '-__v' // Exclude the version key, or simply omit `select` to include all fields
      });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Return the populated cart
    res.status(200).json({ cart: customer.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving cart items' });
  }
};


exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters
    const { productId, quantity } = req.body;

    // Find the customer by user ID
    const customer = await Customer.findOne({ user: userId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the product in the cart
    const cartItem = customer.cart.find(item => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    // Save the updated customer
    await customer.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart item quantity updated successfully!',
      data: { cart: customer.cart }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    // Find the customer by user ID
    const customer = await Customer.findOne({ user: userId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Filter the cart to remove the product
    customer.cart = customer.cart.filter(item => item.productId.toString() !== productId);

    // Save the updated customer
    await customer.save();

    res.status(200).json({
      status: 'success',
      message: 'Product removed from cart successfully!',
      data: { cart: customer.cart }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

