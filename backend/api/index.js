import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes.js';
import teamRoutes from '../routes/teamRoutes.js';
import waiverRoutes from '../routes/waiverRoutes.js';
import bodyParser from 'body-parser';
import stripeWebhook from '../routes/paymentRoutes.js';
import session from 'express-session';
import cors from 'cors';
import stripeLib from 'stripe';
import eventRoutes from '../routes/eventRoutes.js';

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = stripeLib(stripeSecret);

// express app
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 600 * 1000
  }
}));

//must go before express.json
app.use('/api/stripewebhook', stripeWebhook);


// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
  origin: ['https://northernpickleball.ca','http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Use the origin from the request
  const allowedOrigins = ['https://northernpickleball.ca','http://localhost:3000']; // Add other allowed origins if needed
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  } else {
    next();
  }
});

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MongoDB URI is not defined. Please set the MONGODB_URI environment variable.');
}

// routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/events', eventRoutes);

app.use('/api/waivers', waiverRoutes);

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
