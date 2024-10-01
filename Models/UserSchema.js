const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'storeOwner'], required: true }, // 'customer' or 'storeOwner'
  createdAt: { type: Date, default: Date.now },
  // Additional fields for profile
  profilePicture: { type: String },  // Optional
  address: { type: String },         // Optional
  cart: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

module.exports = mongoose.model('User', userSchema);
