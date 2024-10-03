const customerSchema = new Schema({
    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    address: { type: String },    

    cart: [{ 
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }],

    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
    
  }, { timestamps: true });


  module.exports = mongoose.model('Customer', customerSchema);