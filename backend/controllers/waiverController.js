import User from '../models/User.js';
import mongoose from 'mongoose';
import Waiver from '../models/Waiver.js';
import UserWaiver from '../models/UserWaiver.js';

// Get a single user by ID
const getWaiver = async (req, res) => {
  // const { id } = req.params;

  const id = "6673bb5419ddc14265a44bfa";

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such waiver' });
  }

  const waiver = await Waiver.findById(id);

  if (!waiver) {
    return res.status(404).json({ error: 'No such waiver' });
  }

  res.status(200).json(waiver);
};

const signWaiver = async (req, res) => {
  const { userId, waiverId, signature, checks  } = req.body;
  console.log(checks)
  try {
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) {
      return res.status(422).json({ message: "Unable to sign waiver" });
    }

    const waiverExists = await Waiver.findById(waiverId);

    if (!waiverExists) {
      return res.status(404).json({ error: 'No such waiver' });
    }

    if (!checks.every(check => check.value)){
      return res.status(404).json({ error: 'Checks not checked' });
    }

    const filter = { userId: userId, waiverId: waiverId };
    const update = {
      signed: true,
      checks: checks,
      signature: signature
    };

    const result = await UserWaiver.updateOne(filter, update);

    const finalWaiver = await UserWaiver.findOne({userId: userId, waiverId: waiverId});
    
    res.status(200).json(finalWaiver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserWaiver = async (req, res) => {
  const { userId, waiverId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(waiverId)) {
    return res.status(404).json({ error: 'No such waiver' });
  }

  const userWaiver = await UserWaiver.findOne({userId:userId, waiverId: waiverId});

  if (!userWaiver) {
    return res.status(404).json({ error: 'No such waiver' });
  }

  res.status(200).json(userWaiver);
};

export { 
  signWaiver,
  getWaiver,
  getUserWaiver
};
