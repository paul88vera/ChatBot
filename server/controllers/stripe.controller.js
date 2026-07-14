import stripe from "stripe";
import db from "../db/connections.js";

// const session = await stripe.checkout.sessions.create({
//   mode: "subscription",

//   line_items: [
//     {
//       price: "price_1TLES56baMArmzIIcTGuSRZY",
//       quantity: 1,
//     }
//   ],

//   success_url: "http://localhost:5173/success",
//   cancel_url: "http://localhost:5173/cancel",

//   metadata: {
//     orgId: organization.id,
//     plan: "pro",
//   },

//   subscription_data: {
//     metadata: {
//       orgId: organization.id,
//       plan: "pro",
//     },
//   },
// });

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
        const session = event.data.object;
        const orgId = session.metadata?.orgId;
        const plan = session.metadata?.plan;
        await connection.query(
          `
          UPDATE companies
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
        const session = event.data.object;
        const orgId = session.metadata?.orgId;
        const plan = session.metadata?.plan;
        await connection.query(
          `
          UPDATE companies
          SET subscriptionPlan = null
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
