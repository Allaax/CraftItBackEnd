const StoreOwner = require('../Models/StoreOwnerSchema');
const Product = require('../Models/ProductSchema'); // Adjust the path as needed
const { bucket } = require('../firebase'); // Import the bucket from firebase.js

// Function to upload images to Firebase
const uploadImageToFirebase = async (file) => {
  const blob = bucket.file(file.name);
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
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
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
    const storeOwner = await StoreOwner.findOne({ user: req.params.userId }).populate('store.products').populate('store.name');
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
    const storeOwner = await StoreOwner.findOne();
    if (!storeOwner) {
      return res.status(404).json({ message: 'no Store found' });
    }
    res.status(200).json(storeOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
