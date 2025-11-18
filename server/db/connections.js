const mysql = require("mysql2/promise");
require("@dotenvx/dotenvx").config();

async function connectDB() {
  try {
    const db = mysql.createPool({
      host: process.env.VITE_DB_HOST || "localhost",
      user: process.env.VITE_SQL_USER || "root",
      password: process.env.VITE_SQL_PASSWD || "WebDev88!!",
      database: process.env.VITE_SQL_DB || "chatbot_db",
      port: process.env.VITE_DB_PORT || 3306,
    });

    console.log("Database connected successfully!");
    return db;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}

module.exports = connectDB;
