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


