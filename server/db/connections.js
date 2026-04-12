const mysql = require("mysql2/promise");
require("@dotenvx/dotenvx").config();

const isDev = process.env.NODE_ENV !== "production";

const env = isDev
  ? {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_SQL_USER,
      password: process.env.DEV_SQL_PASSWD,
      database: process.env.DEV_SQL_DB,
      port: process.env.DEV_DB_PORT,
    }
  : {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_SQL_USER,
      password: process.env.PROD_SQL_PASSWD,
      database: process.env.PROD_SQL_DB,
      port: process.env.PROD_DB_PORT,
    };

async function connectDB() {
  try {
    const db = mysql.createPool({
      ...env,
      waitForConnections: true,
      connectionLimit: 10, // prevent too many connections
      queueLimit: 0,
    });

    console.log("Database connected successfully!");
    return db;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}

module.exports = connectDB;
