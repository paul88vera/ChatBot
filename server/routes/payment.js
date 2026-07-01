import express from "express";
import { webhook } from "../controllers/stripe.controller.js";

const router = express.Router();

// IMPORTANT: use express.raw() only for this endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

export default router;