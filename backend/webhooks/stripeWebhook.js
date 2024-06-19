import 'dotenv/config';
import express from 'express';
import stripePackage from 'stripe';
import { handlePostPayment } from '../controllers/teamController.js';

const router = express.Router();
const stripeSecret = process.env.STRIPE_SECRET;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripePackage(stripeSecret);
const endpointSecret = webhookSecret;

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log('PaymentIntent was successful!');
      await handlePostPayment(paymentIntentSucceeded.metadata.userId, paymentIntentSucceeded.metadata.teamId, true); // Call handlePostPayment for successful payment
      break;

    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      console.log('PaymentIntent failed.');
      await handlePostPayment(paymentIntentFailed.metadata.userId, paymentIntentFailed.metadata.teamId, false); // Call handlePostPayment for failed payment
      break;

    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`Checkout session completed with ID: ${session.id}`);
      
      if (session.payment_status === 'paid') {
        await handlePostPayment(session.metadata.userId, session.metadata.teamId, true);
      } else {
        await handlePostPayment(session.metadata.userId, session.metadata.teamId, false);
      }
      break;

    case 'checkout.session.async_payment_succeeded':
      const asyncSucceededSession = event.data.object;
      console.log(`Checkout session async payment succeeded with ID: ${asyncSucceededSession.id}`);
      await handlePostPayment(asyncSucceededSession.metadata.userId, asyncSucceededSession.metadata.teamId, true); // Handle successful async payment
      break;

    case 'checkout.session.async_payment_failed':
      const asyncFailedSession = event.data.object;
      console.log(`Checkout session async payment failed with ID: ${asyncFailedSession.id}`);
      await handlePostPayment(asyncFailedSession.metadata.userId, asyncFailedSession.metadata.teamId, false); // Handle failed async payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
};

export { 
  stripeWebhook
};

