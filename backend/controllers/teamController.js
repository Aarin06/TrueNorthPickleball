import 'dotenv/config';
import Team from '../models/Team.js';
import User from '../models/User.js';
import TeamMember from '../models/TeamMember.js';
import mongoose from 'mongoose';
import stripeLib from 'stripe';
import Payment from '../models/Payment.js';

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = stripeLib(stripeSecret);

// get all workouts
const getTeams = async (req, res) => {
  const users = await Team.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single workout
const getTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such team' });
  }

  const team = await Team.findById(id);

  if (!team) {
    return res.status(404).json({ error: 'No such team' });
  }

  res.status(200).json(team);
};

// get a single workout
const getPayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such team' });
  }

  const payment = await Payment.findOne({teamId: id});

  if (!payment) {
    return res.status(404).json({ error: 'No such team' });
  }

  res.status(200).json(payment);
};

const getTeamCaptain = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such team' });
  }

  const team = await Team.findById(id);

  if (!mongoose.Types.ObjectId.isValid(team.id)) {
    return res.status(404).json({ error: 'No such captain' });
  }

  const user = await User.findById(team.captain);

  if (!user) {
    return res.status(404).json({ error: 'No such captain' });
  }

  res.status(200).json(user);
};

const getRoster = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such team' });
  }

  try {
    // Find the team with the given ID
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ error: 'No such team' });
    }

    // Find all team members associated with the team
    const teamMembers = await TeamMember.find({ teamId: id });

    // Extract user IDs from team members
    const userIds = teamMembers.map(member => member.userId);

    // Find the users by their IDs and select only the first and last names
    const users = await User.find({ _id: { $in: userIds } }, 'firstName lastName');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a new workout
const createTeam = async (req, res) => {
  const { teamData } = req.body;

  teamData.playerCount = 1;
  teamData.locked = true;

  console.log(teamData);

  //check empty

  //check if duplicate team

  // add to the database
  try {
    const team = await Team.create(teamData);

    await TeamMember.create({ teamId: team.id, userId: teamData.captain });

    res.status(200).json(team);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { teamData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such team' });
  }

  const team = await Workout.findOneAndUpdate({ _id: id }, {
    ...teamData
  });

  if (!team) {
    return res.status(400).json({ error: 'No such team' });
  }

  res.status(200).json(team);
};

const joinTeam = async (req, res) => {
  const { teamName, userId } = req.body;

  try {
    // Find the team by teamName
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Create a new team member
    const teamMember = await TeamMember.create({ teamId: team.id, userId: userId });

    // Increment the team's count by 1
    
    if (team.playerCount === 4){
      return res.status(404).json({ message: 'Team Full' });
    }
    team.playerCount += 1;
    
    await Team.findOneAndUpdate({ _id: team.id }, team);
    res.status(200).json(team);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const makeTeamPayment = async (req, res) => {
  const { userId, teamId } = req.body;

  console.log("help",req.body)

  const lineItems = [{
    price_data: {
      currency: "cad",
      product_data: {
        name: "League Membership",
      },
      unit_amount: 30000
    },
    quantity: 1
  }];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://true-north-pickleball-front.vercel.app/success?teamId=${teamId}&userId=${userId}`,
    cancel_url: `http://true-north-pickleball-front.vercel.app/failure?teamId=${teamId}&userId=${userId}`
  });

  console.log(session);

  res.json({ id: session.id });
};

const handlePostPayment = async (req, res) => {
  const { userId, teamId, status } = req.body;

  try {
    const payment = await Payment.create({userId, teamId, status});

    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export { 
  getTeams, 
  getTeam, 
  createTeam, 
  updateTeam, 
  joinTeam, 
  getTeamCaptain, 
  getRoster, 
  makeTeamPayment,
  handlePostPayment,
  getPayment
};
