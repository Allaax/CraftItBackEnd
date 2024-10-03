const mongoose = require('mongoose');

const storeOwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  store: {
    name: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalOrders: { type: Number, default: 0 },
    bio: { type: String },
    contactInfo: { type: String },
  }
 // Email or phone for contact
  });
  
  module.exports = mongoose.model('StoreOwner', storeOwnerSchema);
  