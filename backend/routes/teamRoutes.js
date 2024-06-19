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
  getPayment
} from '../controllers/teamController.js';

const router = express.Router();

// GET all workouts
router.get('/', getTeams);

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
router.get('/:teamId/payment', getPayment);

// UPDATE a workout
router.patch('/:id', updateTeam);

// POST a new workout
router.get('/:id/captain', getTeamCaptain);

// POST a new workout
router.get('/:id/roster', getRoster);

export default router;
