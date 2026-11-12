import express from "express";
<<<<<<< HEAD
import { webhook } from "../controllers/stripe.controller.js";
=======
import stripeEvent from "../controllers/stripe.controller.js";
>>>>>>> develop

const router = express.Router();

// IMPORTANT: use express.raw() only for this endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
<<<<<<< HEAD
  webhook
=======
  stripeEvent
>>>>>>> develop
);

export default router;