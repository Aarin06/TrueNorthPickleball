import express from 'express';
import { 
  getEvents,
  getEvent,
  isRegistered,
  registerTeam
 } from '../controllers/eventController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

// GET all workouts
router.get('/', getEvents);

// GET a single workout
router.get('/:id', getEvent);

router.get('/:eventId/registered/:teamId', isRegistered);

router.post('/:eventId/register/;teamId', registerTeam);

export default router;
