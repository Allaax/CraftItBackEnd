const mongoose = require('mongoose');

const storeOwnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  store: {
    image:{type: String},
    name: { type: String, },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalOrders: { type: Number, default: 0 },  
    bio: { type: String },  
    contactInfo: { type: String }, 
     
  }
}, { timestamps: true });

module.exports = mongoose.model('StoreOwner', storeOwnerSchema);
