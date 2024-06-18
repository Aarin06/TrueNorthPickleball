import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes.js';
import teamRoutes from '../routes/teamRoutes.js';
import session from 'express-session';
import cors from 'cors';
import stripeLib from 'stripe';
import jwt from "jsonwebtoken";

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


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  } else {
    next()
  }
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
