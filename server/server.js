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
  "https://verafied.tech",
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

// === Clerk AUTH ===
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.VITE_CLERK_SECRET,
  })
);

// === Clerk AUTH Check For Routes ===
function requireAuth(req, res, next) {
  const { userId, orgId } = getAuth(req);

  console.log("=== AUTH ===");
  console.log("userId:", userId);
  console.log("orgId:", orgId);

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

  next();
}

// === ROUTES ===
app.use("/api/company", requireAuth, companyRoute); // private
// app.use(
//   "/api/company",
//   (req, res, next) => {
//   console.log("=== COMPANY AUTH DEBUG ===");
//   console.log(
//     "Authorization present:",
//     Boolean(req.headers.authorization)
//   );
//   next();
// },
//   requireAuth,
//   companyRoute
// ); // temp debug - delete
app.use("/api", requireAuth, otherRoutes); // private


app.set("trust proxy", true); 


// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
