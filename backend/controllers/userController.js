const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require ("bcrypt");

// get all workouts
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// get a single workout
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// get a single workout
const getMe = async (req, res) => {
  console.log(req.session);


  if (!req.session){
    return res.json(null);
  }
  
  const user = await User.findById(req.session.userId);

  console.log("testing");


  if (user === null) {
    return res.json(null);
  }

  return res.json({"username":user.id});
}

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


const signIn = async (req, res) => {
  const { userData } = req.body

  try {
    
    const user = await User.findOne({email: userData.email});

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }

    const hash = user.password; // Load hash from your password DB.
    const password = userData.password; // this is the password passed in by the user
    const result = bcrypt.compareSync(password, hash);

    if (!result) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }
    
    req.session.userId = {userId:user.id};
    console.log(req.session)

    res.status(200).json({userId:user.id});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const signOut = async (req, res) => {
  req.session.userId = "";

  return res.redirect("/");
}

// // delete a workout
// const deleteWorkout = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   const workout = await Workout.findOneAndDelete({_id: id})

//   if(!workout) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   res.status(200).json(workout)
// }

// // update a workout
// const updateWorkout = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   const workout = await Workout.findOneAndUpdate({_id: id}, {
//     ...req.body
//   })

//   if (!workout) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   res.status(200).json(workout)
// }

module.exports = {
  getUsers,
  getUser,
  createUser,
  signIn,
  signOut,
  getMe
  // deleteWorkout,
  // updateWorkout
}