const StoreOwner = require('../Models/StoreOwnerSchema');
const Product = require('../Models/ProductSchema'); // Adjust the path as needed
const { bucket } = require('../firebase'); // Import the bucket from firebase.js

// Function to upload images to Firebase
const uploadImageToFirebase = async (file, userId) => {
  // Create a unique filename or structured path
  const path = `users/${userId}/images/${Date.now()}_${file.name}`; // Example path
  const blob = bucket.file(path);
  
  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      // Construct the public URL
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
      resolve(publicUrl);
    });

    stream.end(file.data);
  });
};




exports.createProduct = async (req, res) => {
  try {
    const userId = req.params.userId;  // Retrieve the user ID from the route

    // Find the store owner based on the user ID
    const storeOwner = await StoreOwner.findOne({ user: userId });
    if (!storeOwner) {
      return res.status(404).json({ message: 'Store owner not found' });
    }

    // Upload images to Firebase
    const thumbnailUrl = await uploadImageToFirebase(req.files.thumbnail);
    const imageUrls = await Promise.all(req.files.images.map((image) => uploadImageToFirebase(image)));

    // Create a new product with the store owner's ID
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      material: req.body.material,
      category: req.body.category,
      subcategory: req.body.subcategory,
      colors: req.body.colors,
      timeToBeCreated: req.body.timeToBeCreated,
      images: imageUrls,
      thumbnail: thumbnailUrl,
      stock: req.body.stock || 0,
      storeOwner: storeOwner._id  // Use the found store owner's ID
    };

    // Save the product to the database
    const createdProduct = await Product.create(newProduct);

    // Add the product to the store owner’s products array
    storeOwner.store.products.push(createdProduct._id);
    await storeOwner.save();

    res.status(201).json({
      status: 'success',
      message: 'Product has been created!',
      data: { product: createdProduct },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStoreOwnerById = async (req, res) => {
  try {
    const storeOwner = await StoreOwner.findById(req.params.id).populate('store.products').populate('store.name');
    if (!storeOwner) {
      return res.status(404).json({ message: 'Store  not found' });
    }
    res.status(200).json(storeOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllStores = async (req, res) => {
  try {
    const storeOwner = await StoreOwner.find().populate('store.products');
    if (!storeOwner) {
      return res.status(404).json({ message: 'no Store found' });
    }
    res.status(200).json(storeOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateStoreInfo = async (req, res) => {
  try {
    const userId = req.params.userId;  // Assuming userId is provided as a route parameter
    const { name, bio, contactInfo } = req.body;  // Data from the request body
    
    // Find the store owner by user ID
    const storeOwner = await StoreOwner.findOne({ user: userId });
    if (!storeOwner) {
      return res.status(404).json({ message: 'Store owner not found' });
    }
    
    // Update the store fields
    if (name) storeOwner.store.name = name;
    if (bio) storeOwner.store.bio = bio;
    if (contactInfo) storeOwner.store.contactInfo = contactInfo;
    
    // Check if an image is provided in the request files and upload it
    if (req.files && req.files.image) {
      const imageUrl = await uploadImageToFirebase(req.files.image, userId);  // Uploading the image
      storeOwner.store.image = imageUrl;
    }

    // Save the updated storeOwner
    await storeOwner.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Store information updated successfully!',
      data: { store: storeOwner.store }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
