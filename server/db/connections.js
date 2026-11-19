
import mysql from "mysql2/promise";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

const isDev = process.env.NODE_ENV !== "production";

const env = isDev
  ? {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_SQL_USER,
      password: process.env.DEV_SQL_PASSWD,
      database: process.env.DEV_SQL_DB,
      port: Number(process.env.DEV_DB_PORT),
    }
  : {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_SQL_USER,
      password: process.env.PROD_SQL_PASSWD,
      database: process.env.PROD_SQL_DB,
      port: Number(process.env.PROD_DB_PORT),
    };

const db = mysql.createPool({
  ...env,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify database connectivity
db.getConnection()
  .then((connection) => {
    console.log("Database connected successfully!");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default db;
