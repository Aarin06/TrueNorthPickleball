import 'dotenv/config';
import Team from '../models/Team.js';
import mongoose from 'mongoose';
import stripeLib from 'stripe';
import Event from '../models/Event.js';
import EventMember from '../models/EventMember.js';
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = stripeLib(stripeSecret);

// get all workouts
const getEvents = async (req, res) => {
  const events = await Event.find({deletedOn: null}).sort({ createdAt: -1 });

  // const event = await Event.create({
  //   name: 'Summer Tournament',
  //   startDate: new Date("2024-08-25T10:00:00"),
  //   endDate: new Date("2024-08-25T07:00:00"),
  //   allDay: true,
  //   description: 'Test Description',
  //   location: 'Fairgrounds',
  //   locked: false,
  //   cost: 200,
  //   eventData: {
  //     title: "Summer League Signup",
  //     howItWorks: {
  //       title: "How It Works",
  //       description: "By signing up you can expect the following:",
  //       items: [
  //         "This season runs from July 7 - August 25 every Sunday (8 weeks)",
  //         "Each week your team will play 1 Match any time between 10AM - 1PM at Fairgrounds Assembly Park.",
  //         "The match will consist of 3 Games up to 11 using traditional pickle ball scoring",
  //         "If you are a beginner we will provide a Padel and lessons to learn the sport during your first week (no additional cost)",
  //         "Our final week of the season (August 25) will consist of tournament where all teams will participate and compete for prizes",
  //         "All Matches are played outside and details will be sent to you upon sign up",
  //         "If there is a weather delay matches will be rescheduled later in the same calendar week.",
  //         "When you sign up you will create a team and are expected to have 2 players represent to play weekly",
  //         "Each team can have a maximum of 4 Available players",
  //         "Each player must be atleast 18 years of age. Please contact us at northernpickleball@gmail.com if you are younger and interested to join."
  //       ]
  //     },
  //     prizes: {
  //       refreshments: "There will be healthy refreshments provided weekly",
  //       grandPrize: "A grand prize worth up to $400 for the league winners that win the tournament."
  //     }
  //   },
  //   spotsAvailable: 16,
  //   spotsTaken: 0,
  // });

  res.status(200).json(events);
};

// get a single workout
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event' });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: 'No such event' });
  }

  res.status(200).json(event);

};

const isRegistered = async (req, res) => {
  const { eventId, teamId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(404).json({ error: 'No such event' });
  }

  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(404).json({ error: 'No such event' });
  }

  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({ error: 'No such team' });
  }

  const registered = await EventMember.findOne({eventId: eventId, teamId: teamId});

  if (!registered) {
    return res.status(404).json({ error: 'Not registered' });
  }

  res.status(200).json({ registered });
};

const registerTeam = async (req, res) => {
  try {
    const { eventId, teamId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(404).json({ error: 'No such event' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'No such event' });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'No such team' });
    }

    const eventParticipant = await EventMember.create({ teamId: team.id, eventId: eventId.id, registered: true });

    res.status(200).json(eventParticipant);

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export { 
  getEvents, 
  getEvent,
  isRegistered,
  registerTeam
};
