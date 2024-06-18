import express from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  signIn, 
  signOut, 
  getMe 
} from '../controllers/userController.js';
import { authorize } from '../middleware/auth.js';


const router = express.Router();

// GET all users
router.get('/', getUsers);

// POST a new user
router.post('/', createUser);

// POST to sign in
router.post('/signin', signIn);

// GET to sign out
router.get('/signout', signOut);

// GET current user
router.get('/me', authorize, getMe);

// GET a single user by ID
router.get('/:id', getUser);

export default router;
