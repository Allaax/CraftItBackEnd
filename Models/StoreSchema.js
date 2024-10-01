const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },
    bio: { type: String },
    contactInfo: { type: String },  // Email or phone for contact
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Store', storeSchema);
  