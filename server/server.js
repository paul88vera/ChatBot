const express = require("express");
// const cors = require("cors");
const routes = require("./routes/index.js");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const app = express();
require("@dotenvx/dotenvx").config();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(
//   cors({
//     origin: "https://chat.verafied.tech", // frontend domain
//     credentials: true, // if sending cookies
//   })
// );

// ==== Clerk Auth ====
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
app.use("/api", requireAuth, routes);

// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
