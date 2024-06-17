const Team = require('../models/Team')
const User = require('../models/User')
const TeamMember = require('../models/TeamMember')
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

const getTeamCaptain = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such team'})
  }

  const team = await Team.findById(id)

  if (!mongoose.Types.ObjectId.isValid(team.id)) {
    return res.status(404).json({error: 'No such captain'})
  }

  const user = await User.findById(team.captain);

  if (!user) {
    return res.status(404).json({error: 'No such captain'})
  }

  res.status(200).json(user)
}

const getRoster = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such team'})
  }

  try {
    // Find the team with the given ID
    const team = await Team.findById(id)
    if (!team) {
      return res.status(404).json({error: 'No such team'})
    }

    // Find all team members associated with the team
    const teamMembers = await TeamMember.find({ teamId: id })

    // Extract user IDs from team members
    const userIds = teamMembers.map(member => member.userId)

    // Find the users by their IDs and select only the first and last names
    const users = await User.find({ _id: { $in: userIds } }, 'firstName lastName')

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// create a new workout
const createTeam = async (req, res) => {
  const { teamData } = req.body

  teamData.playerCount = 1;
  teamData.locked = true;


  console.log(teamData)

  //check empty

  //check if duplicate team

  // add to the database
  try {
    const team = await Team.create( teamData );

    await TeamMember.create( {teamId:team.id, userId:teamData.captain} );

    res.status(200).json(teamData);

  } catch (error) {
    console.log(error)
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

const joinTeam = async (req, res) => {
  const { teamName, userId } = req.body

  try {
    // Find the team by teamName
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Create a new team member
    const teamMember = await TeamMember.create({ teamId: team.id, userId: userId });

    // Increment the team's count by 1
    
    if (team.playerCount === 4){
      return res.status(404).json({ message: 'Team Full' });
    }
    team.playerCount+=1;
    
    await Team.findOneAndUpdate({_id: team.id}, team);
    res.status(200).json(teamMember);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}



module.exports = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  joinTeam,
  getTeamCaptain,
  getRoster
}