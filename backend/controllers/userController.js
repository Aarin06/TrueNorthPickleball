import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  if (!req.session) {
    return res.json(null);
  }

  console.log(req.session);

  const user = await User.findById(req.session.userId);

  if (user === null) {
    return res.json(null);
  }

  return res.json({ "username": user.id });
};

// Create a new user
const createUser = async (req, res) => {
  const { userData } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  userData.password = bcrypt.hashSync(userData.password, salt);

  try {
    const exists = await User.findOne({ email: userData.email });
    if (exists) {
      return res.status(422).json({ message: "This Email is taken." });
    }
    req.session.userId = 1111;

    const user = await User.create(userData);
    res.status(200).json(user);
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

    if (!result) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }

    req.session.userId = user.id;
    console.log(req.session);
    res.status(200).json({ userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign out a user
const signOut = async (req, res) => {
  req.session.userId = "";
  return res.redirect("/");
};

export { 
  getUsers, 
  getUser, 
  createUser, 
  signIn, 
  signOut, 
  getMe 
};
