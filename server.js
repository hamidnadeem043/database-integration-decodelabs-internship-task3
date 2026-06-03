// ========================================
// PROJECT 3 — Database Integration
// DecodeLabs | Node.js + Express + MongoDB
// ========================================

// STEP 1: Sab packages import karo
const cors = require('cors');
const express  = require('express');   // server ke liye
const mongoose = require('mongoose');  // MongoDB se baat karne ke liye
const dotenv   = require('dotenv');    // .env file padhne ke liye

// STEP 2: .env file load karo
// Ab process.env.MONGO_URI available ho jayega
dotenv.config();

// STEP 3: Express app banao
const app = express();
app.use(cors());
app.use(express.json()); // JSON body parser

// ========================================
// STEP 4: MongoDB Se Connect Karo
// ========================================
// mongoose.connect() MongoDB Atlas se
// connection establish karta hai
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
}).then(() => {
    console.log('✅ MongoDB se connection ho gaya!');
  })
  .catch((err) => {
    console.log('❌ MongoDB connection fail:', err.message);
  });

// ========================================
// STEP 5: Schema Banao
// Schema = database ka blueprint
// Matlab: har user mein kya kya hoga
// ========================================
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name zaroor dena hoga'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email zaroor dena hoga'],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: [1, 'Age 1 se kam nahi ho sakti'],
    max: [120, 'Age 120 se zyada nahi ho sakti']
  },
  createdAt: {
    type: Date,
    default: Date.now  // automatically current time save hogi
  }
});

// ========================================
// STEP 6: Model Banao
// Model = Schema se actual database
// table/collection banta hai
// 'User' = collection ka naam MongoDB mein
// ========================================
const User = mongoose.model('User', userSchema);

// ========================================
// ROUTES — Bilkul Project 2 Jaisi
// Bas array ki jagah ab Database hai!
// ========================================

// GET — Sab users lao database se
app.get('/api/users', async (req, res) => {
  try {
    // User.find() = database se sab users lao
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET — Ek user lao ID se
app.get('/api/users/:id', async (req, res) => {
  try {
    // findById() = sirf ek user ID se dhundho
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User nahi mila'
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// POST — Naya user banao database mein
app.post('/api/users', async (req, res) => {
  try {
    // new User() = naya user object banao
    // user.save() = database mein save karo
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: 'User database mein save ho gaya!',
      data: savedUser
    });
  } catch (err) {
    // Mongoose validation errors
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// PUT — User update karo
app.put('/api/users/:id', async (req, res) => {
  try {
    // findByIdAndUpdate() = dhundho aur update karo
    // new: true = updated user wapas bhejo
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User nahi mila'
      });
    }
    res.status(200).json({
      success: true,
      message: 'User update ho gaya!',
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE — User mitao
app.delete('/api/users/:id', async (req, res) => {
  try {
    // findByIdAndDelete() = dhundho aur mita do
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User nahi mila'
      });
    }
    res.status(200).json({
      success: true,
      message: 'User delete ho gaya!',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ========================================
// Server Start Karo
// ========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chal raha hai: http://localhost:${PORT}`);
});