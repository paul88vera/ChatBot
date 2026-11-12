
import express from "express";
import { Webhook } from "svix";
import db from "../db/connections.js";

const router = express.Router();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Missing CLERK_WEBHOOK_SECRET");
      return res.status(500).json({ error: "Missing webhook secret" });
    }

    let event;

    try {
      const wh = new Webhook(webhookSecret);

      event = wh.verify(req.body, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });

    } catch (err) {
      console.error("Svix verification failed:", err.message);
      return res.status(400).json({ error: "Invalid webhook" });
    }

    try {
      const connection = await db();

      // Verify which database the container is using
      const [databaseInfo] = await connection.query(
        "SELECT DATABASE() AS databaseName"
      );

      console.log("Connected database:", databaseInfo[0].databaseName);

      // ORGANIZATION CREATED
      if (event.type === "organization.created") {
        const orgId = event.data?.id;

        if (!orgId) {
          console.error("Missing organization ID in Clerk payload");
          return res.status(400).json({
            error: "Missing organization ID",
          });
        }

        await connection.execute(
          `
          INSERT INTO chatbot_db.organizations (orgId)
          VALUES (?)
          ON DUPLICATE KEY UPDATE orgId = VALUES(orgId)
          `,
          [orgId]
        );

        console.log("Organization inserted:", orgId);
      }

      // ORGANIZATION MEMBERSHIP CREATED
      else if (event.type === "organizationMembership.created") {
        const orgId = event.data?.organization_id;
        const userId = event.data?.public_user_data?.user_id;

        console.log("Membership organization:", orgId);
        console.log("Membership user:", userId);
        console.log("Membership role:", event.data?.role);

        // Do not assign ownerId to every member.
        // Inspect the payload and establish the actual owner
        // using your verified organization-creation workflow.
      }

      // ORGANIZATION DELETION
      else if (event.type === "organization.deleted") {
        const orgId = event.data?.id;

        if (!orgId) {
          console.error("Missing organization ID in Clerk payload");
          return res.status(400).json({
            error: "Missing organization ID",
          });
        }

        await connection.execute(
          `DELETE FROM chatbot_db.organizations WHERE orgId = (orgId)`,
          [orgId]
        );

        console.log("Organization deleted");
      }

      else {
        console.log("Unhandled Clerk event:", event.type);
      }

      return res.status(200).json({
        received: true,
        event: event.type,
      });

    } catch (err) {
      console.error("=== WEBHOOK DATABASE ERROR ===", err);

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

export default router;
