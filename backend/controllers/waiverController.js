import User from '../models/User.js';
import mongoose from 'mongoose';
import Waiver from '../models/Waiver.js';
import UserWaiver from '../models/UserWaiver.js';

// Get a single user by ID
const getWaiver = async (req, res) => {
  // const { id } = req.params;

  const id = "66a4883700e6e90af4c06904";

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
  const { userId, waiverId, signature, checks, eventId } = req.body;
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

    const filter = { userId: userId, waiverId: waiverId, eventId: eventId};
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
  const { userId, waiverId, eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(waiverId)) {
    return res.status(404).json({ error: 'No such waiver' });
  }

  const userWaiver = await UserWaiver.findOne({userId:userId, waiverId: waiverId});

  if (!userWaiver) {
    const waiverData = {
      userId:userId,
      eventId: eventId,
      signed: false,
      waiverId: "66a4883700e6e90af4c06904",
      checks:[
        {
          label: "I understand that there are no refunds for this summer tournament 2024.",
          value: false,
        },
        {
          label: "I acknowledge that games may be delayed, rescheduled and maybe cancelled due to weather conditions.",
          value: false,
        },
      ]
    }
    
    await UserWaiver.create(waiverData);
    return res.status(404).json({ error: 'No such waiver' });
  }

  res.status(200).json(userWaiver);
};

export { 
  signWaiver,
  getWaiver,
  getUserWaiver
};
