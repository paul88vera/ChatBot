import express from "express";
import cors from "cors";
import otherRoutes from "./routes/chat.js";
import companyRoute from "./routes/company.js";
import stripeRoute from "./routes/payment.js";
import orgRoute from "./routes/organization.js";
import { clerkMiddleware, getAuth } from "@clerk/express";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// List of allowed origins
const allowedOrigins = [
  "https://verafied.tech",
  "https://chatbox.verafied.tech",
  "https://app.verafied.tech",
  "https://app-api.verafied.tech",
  "https://server.verafied.tech",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// === Clerk Webhook ===
//   app.use("/api/webhook", (req, res, next) => {
//   console.log("=== WEBHOOK REQUEST REACHED SERVER ===");
//   console.log("URL:", req.originalUrl);
//   console.log("METHOD:", req.method);
//   next();
// });
app.use("/api/webhook", orgRoute);

//   app.use("/api/webhook", (req, res) => {
//   console.error("Webhook route not matched:", req.method, req.originalUrl);
//   return res.status(404).json({ error: "Webhook route not found" });
// });

// === Stripe Webhook ===
app.use("/api/stripe", stripeRoute);

app.use(express.json());

// WEBHOOK TEST
//   app.post("/api/webhook/clerk", (req, res) => {
//   console.log("=== WEBHOOK TEST ROUTE HIT ===");
//   return res.status(200).json({ received: true });
// });

// === Clerk AUTH ===
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
    authorizedParties: [
      "https://verafied.tech/",
      "https://chatbox.verafied.tech/",
    ],
  }),
);

// === Clerk AUTH Check For Private Routes ===
function requireAuth(req, res, next) {
  const { userId, orgId } = getAuth(req);

  console.log("=== AUTH ===");

  // if (!userId) {
  //   return res.status(401).json({
  //     message: "Unauthorized - no Clerk user",
  //   });
  // }

  if (!orgId) {
    return res.status(401).json({
      message: "Unauthorized - no active organization",
    });
  }

  console.log("userId:", userId);
  console.log("orgId:", orgId);
  next();
}

// === PRIVATE ROUTES ===
app.use("/api/company", requireAuth, companyRoute);
app.use("/api", requireAuth, otherRoutes);

app.set("trust proxy", true);

// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
