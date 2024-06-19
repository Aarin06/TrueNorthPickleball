import express from 'express';
import { stripeWebhook } from '../webhooks/stripeWebhook.js';

const router = express.Router();

// Define the route for handling the Stripe webhook
router.post('/', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
