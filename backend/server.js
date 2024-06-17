require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const teamRoutes = require('./routes/teamRoutes')
const cors =require('cors');

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

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
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
