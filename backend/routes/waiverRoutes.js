import express from 'express';
import { 
  getWaiver,
  signWaiver,
  getUserWaiver
} from '../controllers/waiverController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authorize, signWaiver);

router.get('/:waiverId/user/:userId',authorize, getUserWaiver);

router.get('/', authorize, getWaiver);

export default router;
