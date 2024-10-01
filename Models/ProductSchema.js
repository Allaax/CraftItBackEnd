const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String , required: true  },
    material: { type: String ,required: true  }, 
    category: { type: String , required: true },           
    colors: [String],      
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, 
    timeToBeCreated: { type: String ,required: true  }, 
    // images: [String],        
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' }],       // Array of image URLs
    stock: { type: Number, default: 0 }, 
  
  });
  
  module.exports = mongoose.model('Product', productSchema);
  