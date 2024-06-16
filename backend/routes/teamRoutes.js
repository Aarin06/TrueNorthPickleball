
const express = require('express')
const {
  getTeam, 
  getTeams, 
  createTeam,  
  updateTeam
} = require('../controllers/teamController')

const router = express.Router()

// GET all workouts
router.get('/', getTeams)

// GET a single workout
router.get('/:id', getTeam)

// POST a new workout
router.post('/', createTeam)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateTeam)

module.exports = router
