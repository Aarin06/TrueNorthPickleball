import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { authorize } from '../middleware/auth.js'
import jwt from 'jsonwebtoken';

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// Get a single user by ID
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  res.status(200).json(user);
};

// Get the current user based on session
 const getMe = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "User ID not found in request." });
  }
  res.json({ userId: req.user.userId });
};

// Create a new user
const createUser = async (req, res) => {
  const { userData } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pass = userData.password;
  userData.password = bcrypt.hashSync(userData.password, salt);

  try {
    const exists = await User.findOne({ email: userData.email });
    if (exists) {
      return res.status(422).json({ message: "This Email is taken." });
    }
    req.session.userId = 1111;

    const user = await User.create(userData);
    userData.password = pass;
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign in a user
const signIn = async (req, res) => {
  const { userData } = req.body;

  try {
    console.log(userData);

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }
    
    const hash = user.password; // Load hash from your password DB.
    const password = userData.password; // This is the password passed in by the user
    const result = bcrypt.compareSync(password, hash);
    console.log(hash);
    console.log(password);

    console.log(result);

    if (!result) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }

    // Returning JSON Web Token (search JWT for more explanation)
    const token = jwt.sign({ userId: user._id }, "secret-key", { expiresIn: "1h" });
    res.status(201).json({ response: "User signed in successfully.", token, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign out a user
const signOut = async (req, res) => {
  return res.status(200).json({});
};

export { 
  getUsers, 
  getUser, 
  createUser, 
  signIn, 
  signOut, 
  getMe 
};
