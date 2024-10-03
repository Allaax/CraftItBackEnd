const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  address: { type: String },  
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]  
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
