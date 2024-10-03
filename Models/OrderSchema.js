const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },  // Customer reference
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'StoreOwner', required: true },  // Store owner reference
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
  placedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
