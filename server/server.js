import express from "express";
import cors from "cors";
import otherRoutes from "./routes/chat.js";
import companyRoute from './routes/company.js';
import stripeRoute from './routes/payment.js';
import orgRoute from './routes/organization.js';
import dotenv from "@dotenvx/dotenvx";
import  { clerkMiddleware, getAuth } from "@clerk/express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// List of allowed origins
const allowedOrigins = [
  "https://chatbox.verafied.tech",
  "https://app.verafied.tech",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// === Stripe route ===
app.use("/api/stripe", stripeRoute); //public
app.use("/api/webhook", orgRoute); // public

app.use(express.json());

// === Clerk Auth ===
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
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
app.use("/api/company", requireAuth, companyRoute); // private
app.use("/api", requireAuth, otherRoutes); // private


// DEVELOPMENT ONLY - SERVE FRONTEND
// app.use(express.static("public"));
// app.use(express.static("dist"));

app.set("trust proxy", true); 


// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
