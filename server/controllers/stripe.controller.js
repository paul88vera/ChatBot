
import Stripe from "stripe";
import db from "../db/connections.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function stripeEvent(req, res) {
  let event;

  // Verify that this request genuinely came from Stripe.
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error.message);

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }

  try {
    const connection = await db();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const orgId = session.metadata?.orgId;
        const plan = session.metadata?.plan;

        if (!orgId || !plan) {
          console.error("Missing orgId or plan in Checkout Session metadata");
          return res.status(400).json({
            error: "Missing checkout metadata",
          });
        }

        // For subscription checkout, the subscription status should
        // also be verified before granting paid features.
        if (session.mode !== "subscription") {
          break;
        }

        await connection.query(
          `UPDATE chatbot_db.organizations
           SET subscriptionPlan = ?
           WHERE orgId = ?`,
          [plan, orgId],
        );

        console.log("Organization subscription updated:", {
          orgId,
          plan,
          event: event.type,
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        const orgId = subscription.metadata?.orgId;

        if (!orgId) {
          console.error(
            "Missing orgId in subscription metadata",
            subscription.id
          );
          break;
        }

        // Downgrade the organization instead of deleting it.
        await connection.query(
          `UPDATE chatbot_db.organizations
           SET subscriptionPlan = ?
           WHERE orgId = ?`,
          ["free", orgId],
        );

        console.log("Organization subscription cancelled:", {
          orgId,
          event: event.type,
        });

        break;
      }

      default:
        console.log("Unhandled Stripe event:", event.type);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    // Return an error so Stripe can retry the event.
    return res.status(500).json({
      error: "Webhook processing failed",
    });
  }
}
