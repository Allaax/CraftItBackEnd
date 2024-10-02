const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String , required: true  },
    material: { type: String ,required: true  }, 
    category: { type: String , required: true },           
    colors: [String],      
    timeToBeCreated: { type: String ,required: true  }, 
    images: [String],        
    thumbnail : {type : String, requierd:true},      // Array of image URLs
    stock: { type: Number, default: 0 }, 
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, 
  });
  
  module.exports = mongoose.model('Product', productSchema);
  