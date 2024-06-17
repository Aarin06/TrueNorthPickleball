
const express = require('express')
const {
  getTeam, 
  getTeams, 
  createTeam,  
  updateTeam,
  joinTeam,
  getTeamCaptain,
  getRoster
} = require('../controllers/teamController')

const router = express.Router()

// GET all workouts
router.get('/', getTeams)

// GET a single workout
router.get('/:id', getTeam)

// POST a new workout
router.post('/', createTeam)

// POST a new workout
router.post('/join', joinTeam)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateTeam)


// POST a new workout
router.get('/:id/captain', getTeamCaptain)


// POST a new workout
router.get('/:id/roster', getRoster)


module.exports = router
