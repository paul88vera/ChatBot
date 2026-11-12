import express from "express";
import cors from "cors";
import otherRoutes from "./routes/chat.js";
<<<<<<< HEAD
import companyRoute from './routes/company.js';
import stripeRoute from './routes/payment.js';
import dotenv from "@dotenvx/dotenvx";
import  { clerkMiddleware, getAuth } from "@clerk/express";
=======
import companyRoute from "./routes/company.js";
import stripeRoute from "./routes/payment.js";
import orgRoute from "./routes/organization.js";
import { clerkMiddleware, getAuth } from "@clerk/express";
import dotenv from "@dotenvx/dotenvx";
>>>>>>> develop

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
<<<<<<< HEAD
  "http://localhost:5174",
  "https://chatbox.verafied.tech",
  "https://manager.verafied.tech",
=======
>>>>>>> develop
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
app.use("/api/webhook", orgRoute);

// === Stripe Webhook ===
app.use("/api/stripe", stripeRoute);

// Stripe route
app.use("api/stripe", stripeRoute); //public

app.use(express.json());

<<<<<<< HEAD
// === Clerk Auth ===
=======
// === Clerk AUTH ===
>>>>>>> develop
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
<<<<<<< HEAD
  })
);

// === AUTH ===
function requireAuth(req, res, next) {
  const { userId, orgId } = getAuth(req);

  if (!userId || !orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

// === ROUTES ===
app.use("/api/company", companyRoute); // public
app.use("/api", requireAuth, otherRoutes); // private


// DEVELOPMENT ONLY - SERVE FRONTEND
// app.use(express.static("public"));
// app.use(express.static("dist"));
=======
    authorizedParties: [
      "https://verafied.tech",
      "https://chatbox.verafied.tech",
      "https://server.verafied.tech",
      "http://localhost:5173"
    ],
  }),
);

// === Clerk AUTH Check For Private Routes ===
function requireAuth(req, res, next) {
  const { orgId } = getAuth(req);
>>>>>>> develop

  if (!orgId) {
    return res.status(401).json({
      message: "Unauthorized - no active organization",
    });
  }

  
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
