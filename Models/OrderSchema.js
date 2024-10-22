const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'StoreOwner', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['قيد التنفيذ', 'تم التسليم', 'قيد الانتظار', ] },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, enum: ['سداد', 'نقداً', 'bank_transfer'], required: true },
  placedAt: { type: Date, default: Date.now },
  trackingNumber: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);
