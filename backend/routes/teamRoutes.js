import express from 'express';
import { 
  getTeam, 
  getTeams, 
  createTeam, 
  updateTeam, 
  joinTeam, 
  getTeamCaptain, 
  getRoster, 
  makeTeamPayment,
  handlePostPayment,
  getPayment,
  checkTeams
} from '../controllers/teamController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

// GET all workouts
router.get('/', getTeams);

// GET all workouts
router.get('/check/:name', checkTeams);

// POST a new workout
router.post('/', createTeam);

// POST a new workout
router.post('/payment', makeTeamPayment);

// POST a new workout
router.post('/postpayment', handlePostPayment);

// POST a new workout
router.post('/join', joinTeam);

// GET a single workout
router.get('/:id', getTeam);

// GET a single workout
router.get('/:id/payment',authorize, getPayment);

// // UPDATE a workout
// router.patch('/:id', updateTeam);

// POST a new workout
router.get('/:id/captain', getTeamCaptain);

// POST a new workout
router.get('/:id/roster', getRoster);

export default router;
