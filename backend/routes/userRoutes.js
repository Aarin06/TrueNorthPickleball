
const express = require('express')
const {
  getUsers, 
  getUser, 
  createUser, 
  signIn, 
  signOut,
  getMe
} = require('../controllers/userController')

const router = express.Router()

// GET all workouts
router.get('/', getUsers)

// POST a new workout
router.post('/', createUser)
// POST a new workout
router.post('/signin', signIn);

router.get('/signout', signOut);

router.get('/me', getMe);

// GET a single workout
router.get('/:id', getUser)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router
