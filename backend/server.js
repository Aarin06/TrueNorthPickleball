import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import session from 'express-session';
import cors from 'cors';
import stripeLib from 'stripe';
import jwt from "jsonwebtoken";
import corsHandler from './corsHandler';

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = stripeLib(stripeSecret);

// express app
const app = express();

app.use(session({
  secret: "test",
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 600 * 1000
  }
}));

// middleware
app.use(express.json());
app.use(cors({
  origin: 'https://true-north-pickleball-front.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('https://true-north-pickleball-front.vercel.app', corsHandler);



app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MongoDB URI is not defined. Please set the MONGODB_URI environment variable.');
}

// routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

// connect to db
mongoose.connect(mongoUri)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
