const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
require("@dotenvx/dotenvx").config();
const app = express();
const PORT = process.env.PORT || 5400;
const path = require('path');

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5400",
  "http://127.0.0.1:8888",
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
  credentials: true
}));
app.use(express.json());

// ==== Clerk Auth ====
// app.use(
//   clerkMiddleware({
//     publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
//     secretKey: process.env.VITE_CLERK_SECRET,
//   })
// );  

// === AUTH ===
// async function requireAuth(req, res, next) {
//   const { userId, orgId } = getAuth(req);

//   if (!userId || !orgId) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   next();
// }



// === ROUTES ===
app.use("/api", routes);

app.use(express.static("public"));
app.use(express.static("dist"));

// Serve the embed loader
app.get("/embed.js", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.join(__dirname, "..", "app", "widget", "dist", "embed.js"));
});

// Serve the React bundle and CSS
app.use("/widget", express.static(path.join(__dirname, "..", "app", "widget", "dist")));


// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
