import stripe from "stripe";
import db from "../db/connections.js";

const { userId, orgId } = getAuth(req);

const customer = await stripe.customers.create({
  metadata: {
    orgId,
    clerkUserId: userId,
  },
});

const session = await stripe.checkout.sessions.create({
  customer: customer.id,

  mode: "subscription",

  line_items: [
    {
      price: priceId,
      quantity: 1,
    },
  ],

  metadata: {
    orgId,
    clerkUserId: userId,
    plan,
  },

  subscription_data: {
    metadata: {
      orgId,
      clerkUserId: userId,
      plan,
    },
  },

  success_url:
    "https://chatbox.verafied.tech/dashboard?payment=success",

  cancel_url:
    "https://chatbox.verafied.tech/dashboard?payment=cancelled",
});

export default async function stripeEvent(req, res) {
  const connection = await db();
  let event = stripe.webhooks.constructEvent(
    req.body,
    req.headers["stripe-signature"],
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "checkout.session.completed":
      // Upgrade the organization in your database
      try {
        const orgId = session.metadata?.orgId;
        const plan = session.metadata?.plan;
        await connection.query(
          `
          UPDATE chatbot_db.companies
          SET subscriptionPlan = ?
          WHERE orgId = ?
          `,
          [plan, orgId],
        );
        console.log({
          event: event.type,
          database: process.env.DEV_DB_HOST,
          plan,
          orgId,
        });
      } catch (error) {
        console.error(error);
      }
      break;

    case "customer.subscription.deleted":
      // Downgrade to free
      try {
        const orgId = session.metadata?.orgId;
        await connection.query(
          `
          DELETE FROM chatbot_db.companies
          WHERE orgId = ?
          `,
          [orgId],
        );
        console.log({
          event: event.type,
          database: process.env.DEV_DB_HOST,
          plan,
          orgId,
        });
      } catch (error) {
        console.error(error);
      }
      break;
  }
  res.json({ received: true });
}
