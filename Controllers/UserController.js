const User = require('../Models/UserSchema'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Customer = require('../Models/CustomerSchema');
const StoreOwner = require('../Models/StoreOwnerSchema'); 


// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Based on role, create the appropriate profile (Customer or StoreOwner)
    if (role === 'customer') {
      await Customer.create({ user: newUser._id }); // Create Customer profile
    } else if (role === 'storeOwner') {
      await StoreOwner.create({ user: newUser._id }); // Create StoreOwner profile
    }

    res.status(201).json({ message: 'User created and profile created', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
