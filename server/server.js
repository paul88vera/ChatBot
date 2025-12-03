const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
require("@dotenvx/dotenvx").config();
const app = express();
const PORT = process.env.PORT || 5400;

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://chatbox.verafied.tech"
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
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

app.use(express.json());

// === ROUTES ===
app.use("/api", routes);

app.use(express.static("public"));
app.use(express.static("dist"));

app.set("trust proxy", true); 


// === START SERVER ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
