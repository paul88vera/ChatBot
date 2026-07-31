import express from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    const wh = new Webhook(webhookSecret);

    let event;

    try {
      event = wh.verify(
        req.body,
        {
          "svix-id": req.headers["svix-id"],
          "svix-timestamp": req.headers["svix-timestamp"],
          "svix-signature": req.headers["svix-signature"],
        }
      );
    } catch (err) {
      console.error("Webhook verification failed", err);
      return res.status(400).json({
        error: "Invalid webhook",
      });
    }

    console.log(event.type);

    if (event.type === "organization.created") {
      const organization = event.data;

      console.log("New organization:", organization.id);

      // Insert company here
    }

    res.status(200).json({
      received: true,
    });
  }
);

export default router;