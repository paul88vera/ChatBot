const event = stripe.webhooks.constructEvent(
  req.body,
  req.headers["stripe-signature"],
  process.env.STRIPE_WEBHOOK_SECRET
);

switch (event.type) {
  case "checkout.session.completed":
    // Upgrade the organization in your database
    break;

  case "customer.subscription.deleted":
    // Downgrade to free
    break;
}