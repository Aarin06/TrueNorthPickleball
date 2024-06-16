const Team = require('../models/Team')
const mongoose = require('mongoose')

// get all workouts
const getTeams = async (req, res) => {
  const users = await Team.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// get a single workout
const getTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such team'})
  }

  const team = await Team.findById(id)

  if (!team) {
    return res.status(404).json({error: 'No such team'})
  }

  res.status(200).json(team)
}

// create a new workout
const createTeam = async (req, res) => {
  const { teamData } = req.body

  console.log(teamData)

  //check empty

  //check if duplicate team

  // add to the database
  try {
    const team = await User.create( teamData );
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

// update a workout
const updateTeam = async (req, res) => {
  const { id } = req.params
  const { teamData } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such team'})
  }

  const team = await Workout.findOneAndUpdate({_id: id}, {
    ...teamData
  })

  if (!team) {
    return res.status(400).json({error: 'No such team'})
  }

  res.status(200).json(team);
}

module.exports = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam
}