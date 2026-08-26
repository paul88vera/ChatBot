import express from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import crypto from "crypto";
import db from "../db/connections.js";

const router = express.Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is missing");
      return res.status(500).json({
        error: "Webhook secret is not configured",
      });
    }

    const wh = new Webhook(webhookSecret);

    let event;

    try {
      event = wh.verify(req.body, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } catch (err) {
      console.error("Webhook verification failed:", err);

      return res.status(400).json({
        error: "Invalid webhook",
      });
    }

    console.log("Clerk webhook:", event.type);

    // Organization created
    if (event.type === "organization.created") {
      try {
        const organization = event.data;

        console.log("New organization:", organization);

        const orgId = organization.id;
        // const companyName = organization.name; // temp

        const connection = await db();

        // const publicId = "cmp_" + crypto.randomBytes(4).toString("hex"); // temp

        await connection.execute(
          `
          INSERT INTO chatbot_db.organizations (orgId) VALUES (?);
          `,
          [orgId],
        );

        console.log(`Company created for Clerk organization: ${orgId}`);
      } catch (err) {
        console.error("Failed to create company from Clerk organization:", err);

        return res.status(500).json({
          error: "Failed to create company",
        });
      }
    }

    return res.status(200).json({
      received: true,
    });
  },
);

export default router;
