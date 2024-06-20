import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserWaiver from '../models/UserWaiver.js';
import TeamMember from '../models/TeamMember.js';

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find({}, { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// Get a single user by ID
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  try {
    const user = await User.findById(id, { firstName: 1, lastName: 1, email: 1, phone: 1 });

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
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
      return res.status(409).json({ message: "This Email is taken." });
    }

    const user = await User.create(userData);
    const waiverData = {
      userId:user._id,
      signed: false,
      waiverId: "6673bb5419ddc14265a44bfa",
      checks:[
        {
          label: "I understand that there are no refunds for this summer league 2024 season.",
          value: false,
        },
        {
          label: "I acknowledge that games may be delayed, rescheduled and maybe cancelled due to weather conditions.",
          value: false,
        },
      ]
    }
    
    await UserWaiver.create(waiverData);
    
    user.password = pass;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign in a user
const signIn = async (req, res) => {
  const { userData } = req.body;

  try {

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    const team = await TeamMember.findOne({ userId: user._id }, { teamId: 1 });
    const hash = user.password; // Load hash from your password DB.
    const password = userData.password; // This is the password passed in by the user
    const result = bcrypt.compareSync(password, hash);
 

    if (!result) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    // Returning JSON Web Token (search JWT for more explanation)
    const token = jwt.sign({ userId: user._id }, "secret-key", { expiresIn: "1h" });
    res.status(201).json({ response: "User signed in successfully.", token, userId: user._id, teamId: team.teamId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the current user based on session
const getMe = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "User ID not found in request." });
  }

  const user = await User.findById(req.user.userId);


  res.json(user);
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
