const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },  
    status: { 
      type: String, 
      enum: ['pending', 'shipped', 'delivered'], 
      default: 'pending' 
    },
    shippingAddress: { type: String, required: true },
    placedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  